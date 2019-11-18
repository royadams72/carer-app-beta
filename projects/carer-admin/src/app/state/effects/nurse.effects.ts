import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { NurseActions } from '../actions/';
import { switchMap, map } from 'rxjs/operators';

import { NursesService } from '../../shared/services/nurses/nurses.service';
@Injectable()
export class NurseEffects {

  loadNurses$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.loadNurses),
    switchMap((action) => {
      return this.nursesService.getAllNurses().pipe(
        map((nurse) =>  NurseActions.loadNursesComplete( {nurse} ))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private nursesService: NursesService
  ) {}

}
