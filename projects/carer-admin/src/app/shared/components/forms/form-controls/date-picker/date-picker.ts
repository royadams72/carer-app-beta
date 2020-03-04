

import { Component, OnInit, Input, AfterViewInit, ViewChild} from '@angular/core';
import { FormFieldModel } from '../form-field.model';
import { FormGroup, AbstractControl } from '@angular/forms';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { MatDatepicker } from '@angular/material/datepicker';
// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: any): string {
     if (displayFormat === 'input') {
        const day = date.getDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
     } else {
        return date.toDateString();
     }
  }
  // If required extend other NativeDateAdapter methods.
}

export const MY_DATE_FORMATS = {
  parse: {
     dateInput: { day: 'numeric', month: 'short', year: 'numeric'}
  },
  display: {
     dateInput: 'input',
     monthYearLabel: {year: 'numeric', month: 'short'},
     dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
     monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DatePickerComponent implements OnInit, AfterViewInit {
@Input() config: FormFieldModel;
@Input() formGroup: FormGroup;
isValidMoment = false;
control: AbstractControl;

  ngOnInit(): void {
    if (this.formGroup) {
      this.control = this.formGroup.get(this.config.name);
      // this.control.patchValue(new Date('12-22-1972'))
    }
  }
ngAfterViewInit() {
  // this.picker._selectedChanged.subscribe(
  //   (newDate: Moment) => {
  //     this.isValidMoment = moment.isMoment(newDate);
  //   },
  //   (error) => {
  //     throw Error(error);
  //   }
  // );
}
  getErrorMessage(): string {
  const error = Object.keys(this.control.errors)[0];
  return this.config.errorMessages[error];
  }
}
