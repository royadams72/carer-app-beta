import { Injectable } from '@angular/core';


import { createEffect, ofType, Actions } from '@ngrx/effects';
import { NurseActions } from '../actions/';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { Nurse } from '../../shared/models/nurse.model';
import { of } from 'rxjs';
import { NursesService } from '../../shared/services/nurses/nurses.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class AppEffects {
  private itemsCollection: AngularFirestoreCollection<any>;

  loadNurses$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.loadNurses),
    switchMap(() => {
      return this.nursesService.getAllNurses().pipe(
        map((nurse) =>  NurseActions.loadNursesComplete({ nurse }))
      );
    })
  ));


  constructor(private actions$: Actions,
              private nursesService: NursesService,
              private angularFireStore: AngularFirestore) {}
}
