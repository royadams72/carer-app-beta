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
        this.appraisalCheckBox = this.buildCheckBox('appraisal', 'Add Appraisal', this.appraisalCheckBox, fields.subjectContainer[0]);

        this.holidayCheckBox = this.buildCheckBox('holiday', 'Add Holiday', this.holidayCheckBox, fields.subjectContainer[0]);
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

  setUpCheckBoxes(mainContainer): void {
      const appraisalcheckbox  = this.renderer.createElement('div');
      const appraisalContainer = this.renderer.createElement('div');
      const appraisallabel = this.renderer.createElement('label');
      const text = this.renderer.createText('Add Appraisal');

      this.renderer.setAttribute(appraisalContainer, 'id', `appraisalContainer`);

      if (document.getElementById('appraisalContainer')) {
        this.appraisalCheckBox.host.jqxCheckBox('uncheck');
        return;
      }
      this.renderer.setAttribute(appraisalcheckbox, 'id', `appraisalCheckBox`);
      this.renderer.setStyle(appraisalcheckbox, 'width', '20px');
      this.renderer.setStyle(appraisalContainer, 'height', '20px');
      this.renderer.setStyle(appraisalContainer, 'width', '400px');
      this.renderer.setStyle(appraisalContainer, 'float', 'right');
      this.renderer.setStyle(appraisallabel, 'display', 'inline-block');
      this.renderer.setStyle(appraisalcheckbox, 'display', 'inline-block');

      this.renderer.appendChild(appraisalContainer, appraisalcheckbox);
      this.renderer.appendChild(appraisalContainer, appraisallabel);

      this.renderer.appendChild(appraisallabel, text);


      this.renderer.appendChild(mainContainer, appraisalContainer);
      this.appraisalCheckBox =  jqwidgets.createInstance(`#appraisalCheckBox`, 'jqxCheckBox', {checked: 'appraisal'});
      this.appraisalCheckBox.host.jqxCheckBox('uncheck');

      this.appraisalCheckBox.addEventHandler('checked', () => {
        // console.log(this.appraisalCheckBox.host.val())
        this.disableInput(true);
      });
      this.appraisalCheckBox.addEventHandler('unchecked', () => {
        this.disableInput(false);
      });
  }
  ////////
  buildCheckBox(name: string, labelText: string, localVar: any, mainContainer: any) {
   
    // console.log(document.getElementById(`${name}Container`), mainContainer);
    if (document.getElementById(`${name}Container`)) {
     
      // localVar.host.jqxCheckBox('uncheck');
      // return localVar;
      // this.renderer.removeChild(mainContainer, document.getElementById(`${name}Container`));
      // console.log(document.getElementById(`${name}CheckBox`));
      // console.log(document.getElementById(`${name}Container`).childNodes);
      // console.log(document.getElementById(`${name}Container`).firstChild);

      // while (document.getElementById(`${name}Container`).firstChild) {
      //   // console.log(document.getElementById(`${name}Container`).firstChild);
      //   document.getElementById(`${name}Container`).removeChild(document.getElementById(`${name}Container`).lastChild);
      // }

      // tslint:disable-next-line: prefer-for-of
      // const con = document.getElementById(`${name}Container`);
      // console.log(con.childNodes.length);
      // for (let i = 0; i < con.childNodes.length; i++) {
      //   console.log(con.childNodes[i]);
      //   document.getElementById(`${name}Container`).removeChild(con.childNodes[i]);
      //   // console.log((i + 1), con.childNodes.length, con.childNodes[i]);
        
      //   if ((i + 1) === con.childNodes.length || !con.childNodes[i]) {
      //     mainContainer.removeChild(con);
      //     // console.log(mainContainer);
      //   }
      // }
      // const [els] = [...document.getElementById(`${name}Container`).childNodes]
      // for (const child of document.getElementById(`${name}Container`).childNodes) {
      //   document.getElementById(`${name}Container`).removeChild(child)
      // }
      // document.getElementById(`${name}Container`).removeChild(document.getElementById(`${name}CheckBox`));
      // document.getElementById(`${name}Container`).removeChild(document.getElementById('mfLabel'));
      mainContainer.removeChild(document.getElementById(`${name}Container`));
     
      
      
      
    }
    const checkbox  = this.renderer.createElement('div');
    const container = this.renderer.createElement('div');
    const label = this.renderer.createElement('label');
    const text = this.renderer.createText(`${labelText}`);

    this.renderer.setAttribute(container, 'id', `${name}Container`);
    this.renderer.setAttribute(checkbox, 'id', `${name}CheckBox`);
    this.renderer.setAttribute(label, 'id', `mfLabel`);
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
    localVar =  jqwidgets.createInstance(`#${name}CheckBox`, 'jqxCheckBox', {checked: `${name}`});
    localVar.host.jqxCheckBox('uncheck');

    // console.log(document.getElementById(`${name}CheckBox`));
    localVar.addEventHandler('checked', () => {
      // console.log(this.appraisalCheckBox)
      this.disableInput(true);
    });
    localVar.addEventHandler('unchecked', () => {
      this.disableInput(false);
    });
    this.fieldsToDisable.push(localVar);
    return localVar;
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
    // console.log(checksToDisable);
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
    // console.log(fields.allDay);
    // console.log(this.appraisalCheckBox.host);
    // console.log(this.appraisalCheckBox.element);
    // fields.allDay.jqxCheckBox('check');

    }
  }

  ngAfterViewInit(): void {
    this.showLegendFix();
    if (document.getElementById(`appraisalContainer`)) {
      const container = this.renderer.parentNode(document.getElementById(`appraisalContainer`));
      container.removeChild(document.getElementById(`appraisalContainer`));
      container.removeChild(document.getElementById(`holidayContainer`));
      console.log(container);
    }
    
    // document.getElementById(`${name}Container`).removeChild(document.getElementById(`${name}CheckBox`));
    // console.log(document.getElementById(`appraisalContainer`), document.getElementById(`holidayContainer`));
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
