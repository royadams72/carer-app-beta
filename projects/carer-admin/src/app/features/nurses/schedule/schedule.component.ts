import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../../state/reducers';
import { getSelectedNurseId, getSchedule } from 'carer-admin/src/app/state/selectors';
import { Observable } from 'rxjs';
import { Nurse, Schedule } from 'carer-admin/src/app/shared/models/nurse.model';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { scheduler } from 'carer-admin/src/app/shared/components/forms/form-configs/nurse-config';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  nurseId$: Observable<string>;
  nurseSchedule$: Observable<Schedule[]>;
  appointments = [];
  id: string;
  schedulerConfig = scheduler;

  constructor(private store: Store<State>) {
    this.nurseId$ = this.store.select(getSelectedNurseId);
    // this.nurseSchedule$ = this.store.select(getSchedule);
  }

  ngOnInit() {
    this.nurseSchedule$ = this.store.pipe(select(getSchedule));
    this.nurseId$.subscribe((data => {if (data) { this.id = data; }}));
  }

  onAppointmentUpdated(schedule: Schedule) {
    this.store.dispatch(NurseActions.updateNurseAppointment({nurseId: this.id, schedule}));
  }

  onAppointmentAdded(schedule: Schedule) {
    this.store.dispatch(NurseActions.addNurseAppointment({id: this.id, schedule}));
  }

  onAppointmentDeleted(schedule: Schedule) {
    this.store.dispatch(NurseActions.deleteNurseAppointment({nurseId: this.id, schedule}));
  }
}
