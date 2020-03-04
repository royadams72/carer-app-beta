

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFieldModel } from '../form-field.model';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.html',
  styleUrls: []
})
export class TextFieldComponent implements OnInit {
@Input() config: FormFieldModel;
@Input() formGroup: FormGroup;
control: AbstractControl;


  ngOnInit(): void {
    if (this.formGroup) {
      this.control = this.formGroup.get(this.config.name);
      // this.control.disable();
    }
  }

  getErrorMessage(): string {
  const error = Object.keys(this.control.errors)[0];
  return this.config.errorMessages[error];
  }
}
