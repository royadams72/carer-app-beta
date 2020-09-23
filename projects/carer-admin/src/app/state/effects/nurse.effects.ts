import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { NurseActions } from '../actions/';
import { switchMap, map, mergeMap, catchError, takeUntil } from 'rxjs/operators';

import { NursesService } from '../../shared/services/nurses/nurses.service';
import { of } from 'rxjs';
import { SubscriptionService } from '../../shared/services/core/subscription.service';
@Injectable()
export class NurseEffects {

  loadNurses$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.loadNurses),
    switchMap((action) => {
      return this.nursesService.getAllNurses().pipe(
        takeUntil(this.subService.unsubscribe$),
        map((nurses) => NurseActions.loadNursesComplete( {nurses} ))
      );
    })
  ));

  getNurse$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.getNurse),
    switchMap((action) => {
      return this.nursesService.getNurse(action.id).pipe(
        takeUntil(this.subService.unsubscribe$),
        map((nurse) => NurseActions.getNurseLoaded({nurse}))
      );
    })
  ));

  addNurse$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.addNurse),
    switchMap((action) => {
      return this.nursesService.addNurse(action.nurse).pipe(
        map(() => NurseActions.nurseAdded())
        );
    })
  ));

  updateNurse$ = createEffect(() => this.actions$.pipe(
    ofType<any>(NurseActions.updateNurse),
    switchMap((action) => {
      return this.nursesService.updateNurse(action.nurse).pipe(
        map(() => NurseActions.nurseUpdated())
        );
    })
  ));

  addNurseAppointment$ = createEffect(()  => this.actions$.pipe(
    ofType<any>(NurseActions.addNurseAppointment),
    switchMap((action) => {
      return this.nursesService.addNurseAppointment(action.id, action.schedule).pipe(
        map(() => NurseActions.nurseAppointmentAdded())
        );
    })
  ));

  updateNurseAppointment$ = createEffect(()  => this.actions$.pipe(
    ofType<any>(NurseActions.updateNurseAppointment),
    switchMap((action) => {
      return this.nursesService.updateNurseAppointment(action.schedule, action.nurseId).pipe(
        map(() => NurseActions.appointmentUpdated()),
        catchError(error => {console.log('2= ', error); return of(error); })
        );
    }), catchError(error => {console.log('2= ', error); return of(error); })
  ));

  deleteNurseAppointment$ = createEffect(()  =>  this.actions$.pipe(
    ofType<any>(NurseActions.deleteNurseAppointment),
    switchMap((action) => {
      return this.nursesService.deleteNurseAppointment(action.schedule, action.nurseId).pipe(
        map(() => NurseActions.appointmentDeleted()),
        catchError(error => {console.log('2= ', error); return of(error); })
        );
    }), catchError(error => {console.log('2= ', error); return of(error); })
  ));

  constructor(
    private actions$: Actions,
    private nursesService: NursesService,
    private subService: SubscriptionService
  ) {}

}
