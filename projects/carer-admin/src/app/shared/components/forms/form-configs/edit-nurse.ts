import { ControlType } from 'carer-admin/src/app/core/enum/control-type';
import { Validators } from '@angular/forms';

export const editNurseForm = {
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
        band: {
            name: 'band',
            label: 'Band',
            placeholder: '',
            hint: '',
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
        distance_willing_to_work: {
            name: 'distance_willing_to_work',
            label: 'Distance Willing to Work',
            placeholder: 'Distance Willing to Work',
            hint: 'Hint',
            appearance: 'outline',
            validation: [Validators.required],
            errorMessages: { required: 'Enter something'},
            options: [
                {value: '10', viewValue: '10 miles from address'},
                {value: '20', viewValue: '20 miles from address'},
                {value: '30', viewValue: '30 miles from address'}
              ],
              selected: undefined,
            controlType: ControlType.Option
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
        training_review_date: {
            name: 'training_review_date',
            label: 'Training Review Date',
            placeholder: 'Training Review Date',
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
            controlType: ControlType.Option
        }
};


export const scheduler = {
    source: {
        dataType: 'array',
        dataFields: [
            { name: 'id', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location', type: 'string' },
            { name: 'subject', type: 'string' },
            { name: 'calendar', type: 'string' },
            { name: 'recurrenceRule', type: 'string' },
            { name: 'start', type: 'date' },
            { name: 'end', type: 'date' }
        ],
        id: 'id',
        localData: null
    },
    timezone: 'GMT Standard Time',
      // dataAdapter = new jqx.dataAdapter(this.source);
      // date: any = new jqx.date(new Date());

      appointmentDataFields: {
        from: 'start',
        to: 'end',
        id: 'id',
        description: 'description',
        location: 'location',
        recurrencePattern: 'recurrenceRule',
        subject: 'subject',
        resourceId: 'calendar'
      },

      resources: {
        colorScheme: 'scheme05',
        dataField: 'calendar',
        source: null
    },

      views: [
          'dayView',
          'weekView',
          'monthView'
        ],
};
