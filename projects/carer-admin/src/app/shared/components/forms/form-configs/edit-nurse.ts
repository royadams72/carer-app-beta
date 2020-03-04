import { ControlType } from 'carer-admin/src/app/core/enum/control-type';
import { Validators } from '@angular/forms';

export const editNurseForm = {
        first_name: {
            name: 'first_name',
            label: 'First Name',
            placeholder: 'First Name',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        last_name: {
            name: 'last_name',
            label: 'Last Name',
            placeholder: 'Last Name',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        address_line1: {
            name: 'address_line1',
            label: 'Addres Line 1',
            placeholder: 'Addres Line 1',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        address_line2: {
            name: 'address_line2',
            label: 'Addres Line 2',
            placeholder: 'Addres Line 2',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        city: {
            name: 'city',
            label: 'City',
            placeholder: 'City',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        post_code: {
            name: 'post_code',
            label: 'Post Code',
            placeholder: 'Post Code',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        phone: {
            name: 'phone',
            label: 'Phone',
            placeholder: 'Phone',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        dob: {
            name: 'dob',
            label: 'Date of Birth',
            placeholder: 'Date of Birth',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        probation_end: {
            name: 'probation_end',
            label: 'Probation End',
            placeholder: 'Probation End',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        registration: {
            name: 'registration',
            label: 'Registration',
            placeholder: 'Registration',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        start_date: {
            name: 'start_date',
            label: 'Start Date',
            placeholder: 'Start Date',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.DatePicker
        },
        availability: {
            name: 'availability',
            label: 'Availability',
            placeholder: 'Availability',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        training_review_date: {
            name: 'training_review_date',
            label: 'Training Review Date',
            placeholder: 'Availability',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        dbs: {
            name: 'dbs',
            label: 'DBS',
            placeholder: 'DBS',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        visits: {
            name: 'visits',
            label: 'Visits',
            placeholder: 'Visits',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        },
        band: {
            name: 'band',
            label: 'Band',
            placeholder: '',
            hint: '',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            controlType: ControlType.Control
        }
};
