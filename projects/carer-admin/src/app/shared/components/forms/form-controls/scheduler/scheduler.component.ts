import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Input,
        Output, EventEmitter, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { Schedule } from 'carer-admin/src/app/shared/models/nurse.model';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class SchedulerComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('schedulerReference', {static: false}) scheduler: jqxSchedulerComponent;
  @Input() appointments: Array<Schedule>;
  @Input() config: any;
  @Output() updatedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() deletedAppointment: EventEmitter<any> = new EventEmitter();
  @Output() addedAppointment: EventEmitter<any> = new EventEmitter();
  dataAdapter: jqxSchedulerComponent;
  date = new jqx.date(new Date());
  fields: any;
  validFields = [];
  fieldsToDisable = [];
  saveButton: HTMLTextAreaElement;
  countries: string[] =
  new Array('Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda', 'Argentina');
  element: any;
  clientMatchFound: boolean;
  appraisalCheckBox: any;
  holidayCheckBox: any;

  checkBoxes = {
    appraisal: {
      label: 'Add Appraisal',
    },
    holiday: {
      label: 'Add Holiday',
    },
    training: {
      label: 'Add Training Review',
    }
  };


  clientInputComponent: any;

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
    // console.log(this.appraisalCheckBox.host.val())
    // this.addedAppointment.emit(appointment);
  }

  ngOnInit() {

  }


  editDialogOpen = (dialog, fields, editAppointment) => {
    if (fields) {
      this.validFields = [];
      this.fields = fields;
      fields.statusContainer.hide();
      fields.timeZoneContainer.hide();
      fields.resourceContainer.hide();
      fields.subjectLabel.html('Client');
      fields.colorContainer.hide();
      // fields.repeatContainer.hide();
      setTimeout(() => {
        fields.allDay.jqxCheckBox('uncheck');
        fields.allDayContainer.hide();
        this.saveButton = (document.getElementById(`${fields.saveButton[0].id}`) as HTMLTextAreaElement);
        // Only disable save button if not editing
        if (!editAppointment) {
          this.renderer.setAttribute(this.saveButton, 'disabled', 'true');
        }

        this.setUpJqInput(fields.subject[0].id);
        this.buildCheckBoxes(fields.subjectContainer[0]);
        // this.appraisalCheckBox = this.buildCheckBox('appraisal', 'Add Appraisal', this.appraisalCheckBox, fields.subjectContainer[0]);

        // this.holidayCheckBox = this.buildCheckBox('holiday', 'Add Holiday', this.holidayCheckBox, fields.subjectContainer[0]);
        // TODO: need to add validation to make sure the client is not misspelled and matches DB
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
  buildCheckBoxes(mainContainer) {
    this.removeCheckBoxesFromDOM();
    Object.keys(this.checkBoxes).forEach((key) => {
    const checkbox  = this.renderer.createElement('div');
    const container = this.renderer.createElement('div');
    const label = this.renderer.createElement('label');
    const text = this.renderer.createText(this.checkBoxes[key].label);

    this.renderer.setAttribute(container, 'id', `${key}Container`);
    this.renderer.setAttribute(checkbox, 'id', `${key}CheckBox`);
    this.renderer.setStyle(checkbox, 'width', '20px');
    this.renderer.setStyle(container, 'height', '20px');
    this.renderer.setStyle(container, 'width', '400px');
    this.renderer.setStyle(container, 'float', 'right');
    this.renderer.setStyle(label, 'display', 'inline-block');
    this.renderer.setStyle(checkbox, 'display', 'inline-block');

    this.renderer.appendChild(label, text);
    this.renderer.appendChild(container, checkbox);
    this.renderer.appendChild(container, label);
    this.renderer.appendChild(mainContainer, container);

  // add evenListers to local checkbox vars
    this[`${key}CheckBox`] = jqwidgets.createInstance(`#${key}CheckBox`, 'jqxCheckBox', {checked: `${key}`});
    this[`${key}CheckBox`].host.jqxCheckBox('uncheck');

    this[`${key}CheckBox`].addEventHandler('checked', () => {
      // console.log(this.appraisalCheckBox)
      this.disableInput(true);
    });
    this[`${key}CheckBox`].addEventHandler('unchecked', () => {
      this.disableInput(false);
    });
    this.fieldsToDisable.push(this[`${key}CheckBox`]);

  });
  }


  disableInput(isChecked: boolean): void {
    this.renderer.setProperty(this.clientInputComponent.input, 'disabled', isChecked);
    this.renderer.setProperty(this.clientInputComponent.input, 'value', '');
    const length = this.fieldsToDisable.length;
    const checksToDisable = this.fieldsToDisable.filter((checkBox) => {
      return checkBox.checked === false;
    });
    if (checksToDisable.length === this.fieldsToDisable.length) {
      this.fieldsToDisable.forEach((check) => {
        check.host.jqxCheckBox('enable');
        this.fields.repeatContainer.show();
      });
    } else {
      checksToDisable.forEach((check) => {
        check.host.jqxCheckBox('disable');
        this.fields.repeatContainer.hide();
      });
    }

  }

  setUpJqInput(fieldID) {
    this.clientInputComponent = jqwidgets.createInstance(`#${fieldID}`, 'jqxInput', {
      placeHolder: 'Enter a Client',
      source: this.countries
    });

    this.clientInputComponent.addEventHandler('open', () => {
      document.getElementById(`${fieldID}_popup`).style.zIndex = '2005';
    });
    return this.clientInputComponent;
  }

  matchAgainstArray(fieldToCheckId, fieldContainer, errorText) {
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

    }
  }


  removeCheckBoxesFromDOM() {
    Object.keys(this.checkBoxes).forEach((key) => {
      if (document.getElementById(`${key}Container`)) {
        const container = this.renderer.parentNode(document.getElementById(`${key}Container`));
        container.removeChild(document.getElementById(`${key}Container`));
      }
    });
  }
  ngAfterViewInit(): void {
    this.showLegendFix();
    this.removeCheckBoxesFromDOM();
  }

  showLegendFix() {
    // legend hack
    this.element = this.scheduler.elementRef.nativeElement.querySelector('.jqx-scheduler-legend-bar-bottom');
    const legendBar = this.element;
    this.renderer.removeStyle(legendBar, 'display');
  }

  refreshSchedulerInfo(changes) {
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
    this.refreshSchedulerInfo(changes);
  }
  ngOnDestroy(): void {
    document.getElementById(`${name}Container`)
  }
}
