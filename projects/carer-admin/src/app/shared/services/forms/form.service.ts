import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { ControlType } from '../../../core/enum/control-type';

/**
 * Generic class to allow controlling formgroups
 */
@Injectable()
export class FormService {

    /**
     * Constructor for service
     */
    constructor() {}

    /**
     * Maps formgroup configuration object to a formgroup control
     * Does this by iterating over an object which contains ModelControl types
     *   {FormGroup} form - the form group
     *   {T} formProperties  - the type
     *  {FormGroup} the mapped formgroup
     */
    mapForm(form: FormGroup, formProperties: any ): FormGroup {
        Object.keys(formProperties).forEach((key) => {
            switch (formProperties[key].controlType) {
                case ControlType.DateArray:
                    form.addControl(key, new FormArray([new FormControl(''),
                                         new FormControl(''),
                                         new FormControl('')],
                                         Validators.compose(formProperties[key].validation)));
                    break;
                case ControlType.Array:
                    form.addControl(key, new FormArray([], Validators.compose(formProperties[key].validation)));
                    break;
                case ControlType.FormGroup:
                    const fb = new FormBuilder();
                    const formGroup = this.mapForm(fb.group({}), formProperties[key]);
                    form.addControl(key, formGroup);
                    break;
                case ControlType.Control:
                    form.addControl(key, new FormControl('', formProperties[key].validation));
                    break;
                default:
                    form.addControl(key, new FormControl('', formProperties[key].validation));
                    break;
            }
        });

        return form;
    }

    /**
     * Forces update of formgroup validity
     *  {FormGroup} form - the current formgroup
     */
    updateControlValidity(form: FormGroup): void {
        for (const i in form.controls) {
            if (form.controls[i] !== null) {
                const control = form.controls[i];
                control.markAsTouched();
                control.markAsDirty();
                control.updateValueAndValidity();
            }
        }
    }

    /**
     * Patches data to associated formgroup controls
     * Basic method, currently does not map complex objects to form controls
     *  {FormGroup} form - current formgroup
     *  {any}       data - the data to patch to the form
     */
    setFormControlValues(form: FormGroup, data: any): void {
        Object.keys(form.controls).forEach((key) => {
            if (data[key] || data[key] === 0) {
                form.get(key).patchValue(data[key]);
                form.get(key).markAsDirty();
            }
        });
    }

  /**
   * resets a form controls value and state
   *  {FormGroup} - formGroup - form group that contains the control
   *  {string} control - the name of the form control
   *  {any} value - value to set the control to, by default null
   */
   resetFormControl(form: FormGroup, control: string, value = null): void {
     form.get(control).setValue(value);
     form.get(control).markAsPristine();
     form.get(control).markAsUntouched();
   }
}
