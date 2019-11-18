import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class NursesService {
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private angularFireStore: AngularFirestore) {
    this.itemsCollection = this.angularFireStore.collection<any>('nurses');
  }

  createNurse(data) {
    return new Promise<any>((resolve, reject) => {
        this.angularFireStore
            .collection('nurses')
            .add(data)
            .then(res => {}, err => reject(err));
    });
}

getAllNurses() {
    return this.itemsCollection.valueChanges();
  }

  addNurse(nurse) {
    this.itemsCollection.add(nurse);
  }
}
