import { Validators } from '@angular/forms';

export interface FormModel {
    name: string;
    label: string;
    placeholder?: string;
    hint?: string;
    appearance: string;
    validators?: Validators[];
    errorMessages?: object;
    controlType?: any;
    options?: Array<any>;
    selected?: any;
}
