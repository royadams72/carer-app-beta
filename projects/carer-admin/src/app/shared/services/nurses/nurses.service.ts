import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore, database } from 'firebase/app';
import { Nurse, Schedule, ScheduleData } from '../../models/nurse.model';
import { map, mergeMap, take, switchMap, catchError } from 'rxjs/operators';
import { Observable, of, from, forkJoin, throwError } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class NursesService {
  private itemsCollection: AngularFirestoreCollection<Nurse>;
  private document: AngularFirestoreDocument<Nurse>;
  constructor(private angularFireStore: AngularFirestore) {
    this.itemsCollection = this.angularFireStore.collection<Nurse>('nurses');
  }

  createNurse(data) {
    return new Promise<any>((resolve, reject) => {
        this.angularFireStore
            .collection('nurses')
            .add(data)
            .then(res => {}, err => reject(err));
    });
}

getAllNurses(): Observable<any> {
 return this.itemsCollection.snapshotChanges()
 .pipe(map(actions => {
    return actions.map(a => {
        const data = a.payload.doc.data() as Nurse;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
}


getNurse(nurseId: string): Observable<Nurse> {
  this.document = this.angularFireStore.doc<Nurse>(`nurses/${nurseId}`);
  return this.document.snapshotChanges()
  .pipe(
    map(changes => {
      const data = changes.payload.data();
      const id = changes.payload.id;
      return { id, ...data };
    }));
 }

updateNurse(nurse: Nurse): Observable<any> {
  this.document = this.angularFireStore.doc<Nurse>(`nurses/${nurse.id}`);
  return from(this.document.update(nurse));
 }

  addNurse(nurse: Nurse) {
    this.document = this.angularFireStore.doc<Nurse>(`nurses/${nurse.id}`);
    return of(this.itemsCollection.add(nurse));
  }

  addNurseAppointment(id: string, appointment: Schedule) {
     this.document = this.angularFireStore.doc<Nurse>(`nurses/${id}`);
     return this.addAppointment(appointment);
  }

  updateNurseAppointment(appointment: Schedule, nurseId: string) {
    this.document = this.angularFireStore.doc<Nurse>(`nurses/${nurseId}`);
    return this.appointmentHandler(appointment);
  }

  deleteNurseAppointment(appointment: Schedule, nurseId: string) {
    this.document = this.angularFireStore.doc<Nurse>(`nurses/${nurseId}`);
    return this.appointmentHandler(appointment, false);
  }

  private appointmentHandler(appointment: Schedule, isAdding: boolean = true) {
    if (!appointment) { return; }
    return this.document.valueChanges()
      .pipe(take(1), map(nurse => nurse.schedule.find((a: Schedule) => a.id === appointment.id)),
        switchMap((data: Schedule) => this.deleteAppointment(data)),
        switchMap(() => {
          if (isAdding) {
            return this.addAppointment(appointment);
          } else {
            return of({});
          }
        }),
        catchError(error => {console.log(error); return throwError(error); }));
  }

  private addAppointment(appointment: Schedule) {
    if (!appointment) { return; }
    return from(this.document.update({ schedule: firestore.FieldValue.arrayUnion(appointment)}));
  }

  private deleteAppointment(appointment: Schedule) {
    if (!appointment) { return; }
    return from(this.document.update({ schedule: firestore.FieldValue.arrayRemove(appointment)}))
    .pipe(catchError(error => {console.log(error); return of(error); }));
  }
}
