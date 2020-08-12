import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { Schedule } from 'carer-admin/src/app/shared/models/nurse.model';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})

export class SchedulerComponent implements OnInit, AfterViewInit {
  @ViewChild('schedulerReference', {static: false}) scheduler: jqxSchedulerComponent;
  @Input() appointments: Array<Schedule>;
  @Input() config: any;
  @Output() updatedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() deletedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() addedAppointment: EventEmitter<any> = new EventEmitter();
  dataAdapter: jqxSchedulerComponent;
  date = new jqx.date(new Date());
  clientInputComponent;
  countries: string[] =
  new Array('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda', 'Argentina');

  constructor(private renderer: Renderer2) {  }
  appointmentUpdated($event) {
    // Appointment updated
    const appointment = this.getAppointment($event);
    // console.log(appointment);
    this.updatedAppointment.emit(appointment);
  }

  appointmentDeleted($event) {

    const appointment = this.getAppointment($event);
    this.deletedAppointment.emit(appointment);
  }

  appointmentAdded($event) {
    const appointment = this.getAppointment($event);
    // this.addedAppointment.emit(appointment);
  }

  ngOnInit() {

  }


  editDialogCreate = (dialog, fields, editAppointment) => {
    console.log(this.clientInputComponent);
    if (fields) {
        fields.statusContainer.hide();
        fields.timeZoneContainer.hide();
        fields.resourceContainer.hide();
        fields.subjectLabel.html('Client');
        console.log(this.clientInputComponent);
        setTimeout(() => {
        this.clientInputComponent =  jqwidgets.createInstance(`#${fields.subject[0].id}`, 'jqxInput', {
          placeHolder: 'Enter a Client',
          width: 200,
          height: 25,
          source: this.countries
        });
        console.log(this.clientInputComponent, `#${fields.subject[0].id}_popup`);
        this.clientInputComponent.addEventHandler('open', () => {
            document.getElementById(`${fields.subject[0].id}_popup`).style.zIndex = '1005';
        });
        });
    }
  }
  editDialogClose = (dialog, fields, editAppointment) => {
    if (fields) {
    // this.clientInputComponent.val(null);

    }
  }

  ngAfterViewInit(): void {
    this.config.source.localData = this.appointments;
    this.config.resources.source = new jqx.dataAdapter(this.config.source);
    // this.source.localData = this.appointments;
    // this.dataAdapter = new jqx.dataAdapter(this.source);
    this.dataAdapter = new jqx.dataAdapter(this.config.source);
    console.log(this.scheduler);
  }


  getAppointment(event: any): Schedule {
      console.log(event);
      const {originalData: appointment, originalData : {end, start,  recurrenceRule, subject}} = event.args.appointment;
      appointment.calendar = subject;
      appointment.end = (typeof end) !== 'string' ? end.toISOString() : appointment.end;
      appointment.start = (typeof start) !== 'string' ? start.toISOString() : appointment.start;
      appointment.recurrenceRule = recurrenceRule ? recurrenceRule.toString() : null;
      return appointment;
  }

  clearValues(): void {

  }
}
