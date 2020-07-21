import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { State } from '../../../state/reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Nurse } from 'carer-admin/src/app/shared/models/nurse.model';
import { getSelectedNurse } from 'carer-admin/src/app/state/selectors';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'carer-admin/src/app/shared/services/forms/form.service';
import { editNurseForm } from 'carer-admin/src/app/shared/components/forms/form-configs/edit-nurse';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.scss']
})

export class EditNurseComponent implements OnInit {
  selectedNurse$: Observable<Nurse>;
  form: FormGroup;
  fb: FormBuilder = new FormBuilder();
  private subscriptions = new Subscription();
  formConfig = editNurseForm;
  id: string;

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private formService: FormService) {
    // this.id = this.route.snapshot.params.id;
    this.selectedNurse$ = this.store.select(getSelectedNurse);
  }

  ngOnInit() {
    this.form = this.formService.mapForm(this.fb.group({}), this.formConfig);
    this.selectedNurse$.subscribe((data => {
      if (data) {
        this.formService.setFormControlValues(this.form, data);
      }
    }));


  }


  onSubmit() {
    console.log(this.mapForm(this.form, this.formConfig));
    const data = this.mapForm(this.form, this.formConfig);
    this.store.dispatch(NurseActions.updateNurse({nurse: data}));

  }

  mapForm(form: FormGroup, formProperties: any ) {
    const submitData: any = {};
    Object.keys(form.controls).forEach((key) => {
        submitData[key] = form.get(key).value;
    });
    // Add id
    submitData.id = this.id;
    return submitData;
  }


}

