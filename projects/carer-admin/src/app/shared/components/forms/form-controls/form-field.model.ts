import { Validators } from '@angular/forms';

export interface FormFieldModel {
    name: string;
    label: string;
    placeholder?: string;
    hint?: string;
    appearance: string;
    validators?: Validators[];
    errorMessages?: object;
    controlType?: any;
}
