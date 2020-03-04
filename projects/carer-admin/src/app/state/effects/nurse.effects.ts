import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { NurseActions } from '../actions/';
import { switchMap, map } from 'rxjs/operators';

import { NursesService } from '../../shared/services/nurses/nurses.service';
@Injectable()
export class NurseEffects {

  loadNurses$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.loadNurses),
    switchMap(() => {
      return this.nursesService.getAllNurses().pipe(
        map((nurses) => NurseActions.loadNursesComplete( {nurses} ))
      );
    })
  ));

  getNurse$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.getNurse),
    switchMap((action) => {
      return this.nursesService.getNurse(action.id).pipe(
        map((nurse) => NurseActions.getNurseLoaded({nurse}))
      );
    })
  ));

  updateNurse$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.updateNurse),
    switchMap((action) => {
      return this.nursesService.updateNurse(action.nurseId, action.nurse).then(
        (nurse) => NurseActions.nurseUpdated()
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private nursesService: NursesService
  ) {}

}
