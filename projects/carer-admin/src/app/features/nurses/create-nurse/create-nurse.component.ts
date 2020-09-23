import { Component, OnInit, OnDestroy} from '@angular/core';
import { State } from '../../../state/reducers';
import { Store, select} from '@ngrx/store';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { editNurseForm } from 'carer-admin/src/app/shared/components/forms/form-configs/edit-nurse';
import { FormService } from 'carer-admin/src/app/shared/services/forms/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { getTempNurse } from 'carer-admin/src/app/state/selectors';
import { Nurse } from 'carer-admin/src/app/shared/models/nurse.model';
import { take } from 'rxjs/operators';
import { ControlType } from 'carer-admin/src/app/core/enum/control-type';

@Component({
  selector: 'app-create-nurse',
  templateUrl: './create-nurse.component.html',
  styleUrls: ['./create-nurse.component.scss']
})
export class CreateNurseComponent implements OnInit, OnDestroy {

  constructor(private formService: FormService, private store: Store<State>) {}

  formConfig = editNurseForm;
  form: FormGroup;
  formSubscription: Subscription;
  fb: FormBuilder = new FormBuilder();

  ngOnInit() {
    this.form = this.formService.mapForm(this.fb.group({}), this.formConfig);
    // this.store.pipe(select(getTempNurse)
    const getFormState = this.store.pipe(select(getTempNurse));

    this.formSubscription = combineLatest(getFormState, this.form.valueChanges)
      .subscribe(data => {
        const [formState, formObject] = data;

        Object.entries(formObject).forEach(([key, value]) => {
          //  Also need to check store if value has been updated
          if (!formState || this.form.get(key).value !== '' && this.form.get(key).status === 'VALID'
            && formState[key] !== this.form.get(key).value) {
            console.log(this.form.get(key).value);
            // @ts-ignore
            // value = this.formConfig[key].controlType === ControlType.DatePicker ? value.toISOSrting() : value;
            // if (this.formConfig[key].controlType === ControlType.DatePicker ) {
            //   this.form.get(key).setValue(new Date(this.form.get(key).value.toString()));
            //   console.log(new Date(this.form.get(key).value.toISOString()));
            // }
            this.store.dispatch(NurseActions.saveNurseForm({ key, value: this.form.get(key).value  }));

          }

        });

      });

    this.store.pipe(select(getTempNurse), take(1))
      .subscribe((data => {
        if (data) {
          this.formService.setFormControlValues(this.form, data);
        }
      }));
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.store.dispatch(NurseActions.clearTempNurse());
  }

  onSubmit(): void {

    if (this.form.invalid) { return; }
    const data = this.mapForm(this.form, this.formConfig);
    console.log(data);
    this.store.dispatch(NurseActions.addNurse({ nurse: data }));

  }


   // TODO: Put in service

  mapForm(form: FormGroup, formProperties: any) {
    const submitData: any = {};
    Object.keys(form.controls).forEach((key) => {
      submitData[key] = formProperties[key].controlType === ControlType.DatePicker && typeof form.get(key).value !== 'string' ?
      form.get(key).value.toISOString() : form.get(key).value;
      console.log(submitData[key]);

    });
    // Add id
    // submitData.id = this.id$;
    return submitData;
  }
}
