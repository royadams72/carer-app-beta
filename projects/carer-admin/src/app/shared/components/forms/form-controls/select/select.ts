

import { Component, OnInit, Input } from '@angular/core';
import { FormModel } from '../form.model';
import { FormGroup, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  styleUrls: []
})

export class SelectComponent implements OnInit {
  @Input() config: FormModel;
  @Input() formGroup: FormGroup;
  control: AbstractControl;
  selected: string;
  options: Array<any>;
  constructor() {

  }
  ngOnInit(): void {
    this.initialise();
    this.updateValueOfSelectOnLoad();
  }

  initialise() {
    if (this.formGroup) {
      this.control = this.formGroup.get(this.config.name);
      this.options = this.config.options;
    }
  }

  updateValueOfSelectOnLoad() {
    // Need to wait for the select to get a value sent from db
    // This triggers valueChanges which is used to update the selected value
    this.control.valueChanges.subscribe((data) => {
      this.selected = this.formGroup.get(this.config.name).value;
    });
  }

  onChange(event) {
    // The selected value does not update the control value
    // So need to update it manually, for submission.
    this.formGroup.get(this.config.name).patchValue(event.value);
  }

  getErrorMessage(): string {
    const error = Object.keys(this.control.errors)[0];
    return this.config.errorMessages[error];
  }
}
