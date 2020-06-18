import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Nurse } from '../../models/nurse.model';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NursesService {
  private itemsCollection: AngularFirestoreCollection<any>;
  private document: any;
  constructor(private angularFireStore: AngularFirestore) {
    this.itemsCollection = this.angularFireStore.collection<Nurse>('nurses');
    // this.document = this.angularFireStore.doc<Nurse>('');
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
 console.log('getNurse');
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
  const doc = this.angularFireStore.doc<Nurse>(`nurses/${nurseId}`);
  return doc.snapshotChanges()
  .pipe(
    map(changes => {
      const data = changes.payload.data();
      const id = changes.payload.id;
      return { id, ...data };
    }));
 }

updateNurse(nurse: Nurse): Observable<any> {
  console.log('updateNurse')
  const doc = this.angularFireStore.doc<Nurse>(`nurses/${nurse.id}`);
  return from(doc.update(nurse));
 }

  addNurse(nurse: Nurse) {
    this.itemsCollection.add(nurse);
  }
}
