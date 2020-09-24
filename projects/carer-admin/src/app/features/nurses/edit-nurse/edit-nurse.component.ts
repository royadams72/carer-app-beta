import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { State } from '../../../state/reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Nurse } from 'carer-admin/src/app/shared/models/nurse.model';
import { getSelectedNurse, getSelectedNurseId } from 'carer-admin/src/app/state/selectors';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'carer-admin/src/app/shared/services/forms/form.service';
import { nurseForm } from 'carer-admin/src/app/shared/components/forms/form-configs/nurse-config';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.scss']
})

export class EditNurseComponent implements OnInit {
  selectedNurse$: Observable<Nurse>;
  id: string;
  form: FormGroup;
  fb: FormBuilder = new FormBuilder();
  private subscriptions = new Subscription();
  formConfig = nurseForm;

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private formService: FormService) {
    this.selectedNurse$ = this.store.select(getSelectedNurse);
  }

  ngOnInit() {
    this.form = this.formService.mapForm(this.fb.group({}), this.formConfig);
    this.store.pipe(select(getSelectedNurseId)).subscribe(id => this.id = id);
    this.selectedNurse$.subscribe((data => {
      if (data) {
        this.formService.setFormControlValues(this.form, data);
      }
    }));


  }


  onSubmit() {
    const data = this.formService.mapSubmitFormData(this.form, this.formConfig, this.id);
    this.store.dispatch(NurseActions.updateNurse({nurse: data}));
  }

}

