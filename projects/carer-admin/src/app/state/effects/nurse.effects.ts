import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { NurseActions } from '../actions/';
import { switchMap, map, mergeMap } from 'rxjs/operators';

import { NursesService } from '../../shared/services/nurses/nurses.service';
@Injectable()
export class NurseEffects {

  loadNurses$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.loadNurses),
    switchMap((action) => {
      return this.nursesService.getAllNurses().pipe(
        map((nurses) => NurseActions.loadNursesComplete( {nurses} ))
      );
    })
  ));

  // getNurse$ = createEffect(() => this.actions$.pipe(
  //   ofType<any>(NurseActions.getNurse),
  //   switchMap((action) => {
  //     return this.nursesService.getNurse(action.id).pipe(
  //       map((nurse) => NurseActions.getNurseLoaded({nurse}))
  //     );
  //   })
  // ));

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
      console.log(action);
      return this.nursesService.updateNurse(action.nurse).pipe(
        map((nurse) => NurseActions.nurseUpdated())
        );
    })
  ));

  addNurseAppointment$ = createEffect(()  => this.actions$.pipe(
    ofType<any>(NurseActions.addNurseAppointment),
    switchMap((action) => {
      console.log(action);
      return this.nursesService.addNurseAppointment(action.id, action.schedule).pipe(
        map(() => NurseActions.nurseAppointmentAdded())
        );
    })
  ));

  updateNurseAppointment$ = createEffect(()  => this.actions$.pipe(
    ofType<any>(NurseActions.updateNurseAppointment),
    switchMap((action) => {
      console.log(action);
      return this.nursesService.updateNurseAppointment(action.id, action.schedule).pipe(
        map(() => NurseActions.appointmentUpdated())
        );
    })
  ));
  constructor(
    private actions$: Actions,
    private nursesService: NursesService
  ) {}

}
