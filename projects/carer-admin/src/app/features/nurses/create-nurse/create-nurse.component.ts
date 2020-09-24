import { Component, OnInit, OnDestroy} from '@angular/core';
import { State } from '../../../state/reducers';
import { Store, select} from '@ngrx/store';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { nurseForm } from 'carer-admin/src/app/shared/components/forms/form-configs/nurse-config';
import { FormService } from 'carer-admin/src/app/shared/services/forms/form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { getTempNurse } from 'carer-admin/src/app/state/selectors';
import { take, takeUntil } from 'rxjs/operators';
import { SubscriptionService } from '../../../shared/services/core/subscription.service';

@Component({
  selector: 'app-create-nurse',
  templateUrl: './create-nurse.component.html',
  styleUrls: ['./create-nurse.component.scss']
})
export class CreateNurseComponent implements OnInit, OnDestroy {

  constructor(private formService: FormService,
              private store: Store<State>,
              private subService: SubscriptionService) {}

  formConfig = nurseForm;
  form: FormGroup;
  formSubscription: Subscription;
  fb: FormBuilder = new FormBuilder();

  ngOnInit() {
    this.form = this.formService.mapForm(this.fb.group({}), this.formConfig);
    const getFormState = this.store.pipe(select(getTempNurse));

    combineLatest(getFormState, this.form.valueChanges)
    .pipe(takeUntil(this.subService.unsubscribe$))
      .subscribe(data => {
        const [formState, formObject] = data;

        Object.entries(formObject).forEach(([key, value]) => {
          //  Also need to check store if value has been updated
          if (!formState || value !== '' && this.form.get(key).status === 'VALID'
            && formState[key] !== value) {
            // console.log(formState[key], key, value);
            this.store.dispatch(NurseActions.saveNurseForm({ key, value }));
          }

        });

      });
    // this.nurseFormService.updateNurseFormState(this.form);
    this.store.pipe(select(getTempNurse), take(1))
      .subscribe((data => {
        if (data) {
          this.formService.setFormControlValues(this.form, data);
        }
      }));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
    this.store.dispatch(NurseActions.clearTempNurse());
  }

  onSubmit(): void {
    if (this.form.invalid) { return; }
    const data = this.formService.mapSubmitFormData(this.form, this.formConfig);
    console.log(data);
    this.store.dispatch(NurseActions.addNurse({ nurse: data }));

  }

}
