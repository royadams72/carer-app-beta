import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { State } from '../../../state/reducers';
import { NursesService } from 'carer-admin/src/app/shared/services/nurses/nurses.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Nurse } from 'carer-admin/src/app/shared/models/nurse.model';
import { nurseSelected } from 'carer-admin/src/app/state/selectors';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'carer-admin/src/app/shared/services/forms/form.service';
import { editNurseForm } from 'carer-admin/src/app/shared/components/forms/form-configs/edit-nurse';
import { MockNurse } from 'carer-admin/src/app/shared/mock-data/mock-nurse';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.scss']
})
export class EditNurseComponent implements OnInit {
  selectedNurse$: Observable<Nurse>;
  form: FormGroup;
  fb: FormBuilder = new FormBuilder();
  formConfig = editNurseForm;
  nurseId: string;
  mockNurse = MockNurse;
  constructor(private store: Store<State>,
              private ns: NursesService,
              private route: ActivatedRoute,
              private formService: FormService) {
    this.store.dispatch(NurseActions.getNurse({id: this.route.snapshot.params.id}));

  }

  ngOnInit() {
    this.selectedNurse$ = this.store.select(nurseSelected);
    this.form = this.formService.mapForm(this.fb.group({}), this.formConfig);
    this.selectedNurse$.subscribe((data => {
    if (data) {
      this.nurseId = data.id;
      this.formService.setFormControlValues(this.form, data);
    }
    }));

  }
  onClick() {
    this.store.dispatch(NurseActions.updateNurse({nurseId: this.nurseId, nurse: this.mockNurse}));
  }

}
