import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, Renderer2, OnChanges, SimpleChanges} from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { Schedule } from 'carer-admin/src/app/shared/models/nurse.model';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class SchedulerComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('schedulerReference', {static: false}) scheduler: jqxSchedulerComponent;
  @Input() appointments: Array<Schedule>;
  @Input() config: any;
  @Output() updatedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() deletedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() addedAppointment: EventEmitter<any> = new EventEmitter();
  dataAdapter: jqxSchedulerComponent;
  date = new jqx.date(new Date());
  validFields = [];
  saveButton: HTMLTextAreaElement;
  countries: string[] =
  new Array('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda', 'Argentina');
  element: any;
  clientMatchFound: boolean;
  constructor(private renderer: Renderer2) {  }
  appointmentUpdated($event) {
    // Appointment updated
    const appointment = this.getAppointment($event);
    this.updatedAppointment.emit(appointment);
  }

  appointmentDeleted($event) {
    const appointment = this.getAppointment($event);
    this.deletedAppointment.emit(appointment);
  }

  appointmentAdded($event) {
    const appointment = this.getAppointment($event);
    this.addedAppointment.emit(appointment);
  }

  ngOnInit() {

  }


  editDialogOpen = (dialog, fields, editAppointment) => {
    if (fields) {
      this.validFields = [];
      fields.statusContainer.hide();
      fields.timeZoneContainer.hide();
      fields.resourceContainer.hide();
      fields.subjectLabel.html('Client');
      fields.colorContainer.hide();
      setTimeout(() => {
        fields.allDay.jqxCheckBox('uncheck');
        fields.allDayContainer.hide();
        this.saveButton = (document.getElementById(`${fields.saveButton[0].id}`) as HTMLTextAreaElement);
        // Only disable save button if not editing
        if (!editAppointment) {
          this.renderer.setAttribute(this.saveButton, 'disabled', 'true');
        }
        this.setUpJqInput(fields.subject[0].id);
        // TODO: need to add validation to make sure the client is not mis spelled and matches DB
        this.addValidation(fields.subject[0].id, fields.subjectContainer[0], 'Please make sure Client is filled in');
        this.matchAgainstArray(fields.subject[0].id, fields.subjectContainer[0], 'Please make sure Client is spelt correctly');
        this.addValidation(fields.location[0].id, fields.locationContainer[0], 'Please make sure Location is filled in');
        this.addValidation(fields.description[0].id, fields.descriptionContainer[0], 'Please make sure Description is filled in');
      });


    }
  }

  addValidation(fieldToCheckId, fieldContainer, errorText) {
    const errDivId = `${fieldToCheckId}_err`;
    const errDiv =  document.getElementById(errDivId);
    let err: any;
    let text: any;
    let index;
    // Only add error div if it sn't been already
    if (!errDiv) {
      err = this.renderer.createElement('div');
      text = this.renderer.createText(errorText);
      this.renderer.setAttribute(err, 'id', errDivId);
      this.renderer.appendChild(err, text);
      this.renderer.setStyle(err, 'width', '400px');
      this.renderer.setStyle(err, 'float', 'right');
      this.renderer.setStyle(err, 'display', 'none');
      this.renderer.appendChild(fieldContainer, err);
    } else {
      err = document.getElementById(errDivId);
      this.renderer.setStyle(err, 'display', 'none');
    }

    const field = (document.getElementById(fieldToCheckId) as HTMLTextAreaElement);
    index = this.validFields.push(field.value) - 1;
    //  push value o into array and get the i?
    this.renderer.listen(field, 'keyup', (e) => {
      const val = (e.target as HTMLTextAreaElement).value;
      val === '' ? this.renderer.setStyle(err, 'display', 'block') : this.renderer.setStyle(err, 'display', 'none');
      this.validFields[index] = val;
      // this.isFieldsEmpty();
      this.checkAllValidation();
    });


  }
  setUpJqInput(fieldID) {
    const clientInputComponent = jqwidgets.createInstance(`#${fieldID}`, 'jqxInput', {
      placeHolder: 'Enter a Client',
      source: this.countries
    });

    clientInputComponent.addEventHandler('open', () => {
      document.getElementById(`${fieldID}_popup`).style.zIndex = '2005';
    });
    return clientInputComponent;
  }

  matchAgainstArray(fieldToCheckId, fieldContainer, errorText) {
    // index = this.validFields.push(field.value) - 1;
    //  push value o into array and get the i?
    const err = this.setUpErrorDiv(fieldToCheckId, errorText, fieldContainer);
    const field = (document.getElementById(fieldToCheckId) as HTMLTextAreaElement);
    this.renderer.listen(field, 'change', (e) => {
      const val = (e.target as HTMLTextAreaElement).value;
      this.clientMatchFound = !!this.countries.find(item => item === val);
      !this.clientMatchFound  ? this.renderer.setStyle(err, 'display', 'block') : this.renderer.setStyle(err, 'display', 'none');
      this.checkAllValidation();
    });


  }
  setUpErrorDiv(fieldToCheckId, errorText, fieldContainer) {
    const errDivId = `${fieldToCheckId}_err2`;
    const errDiv =  document.getElementById(errDivId);
    let err: any;
    let text: any;
    // let index;
    // Only add error div if it hasn't been already
    if (!errDiv) {
      err = this.renderer.createElement('div');
      text = this.renderer.createText(errorText);
      this.renderer.setAttribute(err, 'id', errDivId);
      this.renderer.appendChild(err, text);
      this.renderer.setStyle(err, 'width', '400px');
      this.renderer.setStyle(err, 'float', 'right');
      this.renderer.setStyle(err, 'display', 'none');
      this.renderer.appendChild(fieldContainer, err);

    } else {
      err = document.getElementById(errDivId);
      this.renderer.setStyle(err, 'display', 'none');
    }

    return err;
  }

  checkAllValidation() {
    if (!this.isFieldsEmpty() && this.clientMatchFound) {
      this.renderer.removeAttribute(this.saveButton, 'disabled');
    } else {
      this.renderer.setAttribute(this.saveButton, 'disabled', 'true');
    }
  }

  isFieldsEmpty() {
    return this.validFields.indexOf('') === -1 ? false : true;
  }

  editDialogClose = (dialog, fields, editAppointment) => {
    if (fields) {
    fields.allDay.jqxCheckBox('check');

    }
  }

  ngAfterViewInit(): void {
    this.showLegendFix();
  }

  showLegendFix() {
    // legend hack
    this.element = this.scheduler.elementRef.nativeElement.querySelector('.jqx-scheduler-legend-bar-bottom');
    const legendBar = this.element;
    this.renderer.removeStyle(legendBar, 'display');
  }

  setUpSchedulerInfo(changes) {
    this.config.source.localData = changes.appointments.currentValue;
    this.config.resources.source = new jqx.dataAdapter(this.config.source);
    this.dataAdapter = new jqx.dataAdapter(this.config.source);
  }

  getAppointment(event: any): Schedule {
      const {originalData: appointment, originalData : {end, start,  recurrenceRule, subject}} = event.args.appointment;
      appointment.subject = `${subject}`;
      appointment.calendar = subject;
      appointment.end = (typeof end) !== 'string' ? end.toISOString() : appointment.end;
      appointment.start = (typeof start) !== 'string' ? start.toISOString() : appointment.start;
      appointment.recurrenceRule = recurrenceRule ? recurrenceRule.toString() : null;
      return appointment;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setUpSchedulerInfo(changes);
  }

}
