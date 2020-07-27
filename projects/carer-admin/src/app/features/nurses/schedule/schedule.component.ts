import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../state/reducers';
import { getSelectedNurseId, getSchedule } from 'carer-admin/src/app/state/selectors';
import { Observable } from 'rxjs';
import { Nurse, Schedule } from 'carer-admin/src/app/shared/models/nurse.model';
import { NurseActions } from 'carer-admin/src/app/state/actions';

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

  constructor(private store: Store<State>) {
    this.nurseId$ = this.store.select(getSelectedNurseId);
    this.nurseSchedule$ = this.store.select(getSchedule);
  }

  ngOnInit() {
    this.nurseSchedule$.subscribe((data => { if (data) { this.appointments = data; } }));
    this.nurseId$.subscribe((data => {if (data) { this.id = data; }}));
    // console.log(this.appointments);
  }
  onAppointmentUpdated(schedule: Schedule) {
    this.store.dispatch(NurseActions.updateNurseAppointment({id: this.id, schedule}));
    console.log(schedule);
  }

  onAppointmentAdded(schedule: Schedule) {
    this.store.dispatch(NurseActions.addNurseAppointment({id: this.id, schedule}));
    console.log(schedule);
  }

  onAppointmentDeleted(schedule: Schedule) {
    console.log(schedule);
  }
}
