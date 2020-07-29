import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { Schedule } from 'carer-admin/src/app/shared/models/nurse.model';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent implements OnInit, AfterViewInit {
  @ViewChild('schedulerReference', {static: false}) scheduler: jqxSchedulerComponent;
  @Input() appointments: Array<Schedule>;
  @Output() updatedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() deletedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() addedAppointment: EventEmitter<any> = new EventEmitter();

  source: any = {
    dataType: 'array',
    dataFields: [
        { name: 'id', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'calendar', type: 'string' },
        { name: 'recurrenceRule', type: 'string' },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
    ],
    id: 'id',
    localData: this.appointments
};

  dataAdapter = new jqx.dataAdapter(this.source);
  // date: any = new jqx.date(new Date());

  appointmentDataFields: any = {
    from: 'start',
    to: 'end',
    id: 'id',
    description: 'description',
    location: 'location',
    recurrencePattern: 'recurrenceRule',
    subject: 'subject',
    resourceId: 'calendar'
  };

  resources: any =  {
    colorScheme: 'scheme05',
    dataField: 'calendar',
    source: new jqx.dataAdapter(this.source)
};

  views: any[] =
  [
      'dayView',
      'weekView',
      'monthView'
  ];
  constructor() { }
  appointmentUpdated($event) {
    // Appointment updated
    const appointment = this.getAppointment($event);
    console.log(appointment);
    this.updatedAppointment.emit(appointment);
  }

  appointmentDeleted($event) {
    console.log($event);
    const appointment = this.getAppointment($event);
    this.deletedAppointment.emit(appointment);
  }

  appointmentAdded($event) {
    const appointment = this.getAppointment($event);
    this.addedAppointment.emit(appointment);
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.source.localData = this.appointments;
    this.dataAdapter = new jqx.dataAdapter(this.source);
  }


  getAppointment(event: any): Schedule {
      const {originalData: appointment, originalData : {end, start,  recurrenceRule}} = event.args.appointment;
      appointment.end = (typeof end) !== 'string' ? end.toISOString() : appointment.end;
      appointment.start = (typeof start) !== 'string' ? start.toISOString() : appointment.start;
      appointment.recurrenceRule = recurrenceRule ? recurrenceRule.toString() : null;
      return appointment;
  }
}
