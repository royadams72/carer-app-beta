import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../state/reducers';
import {  getSelectedNurse } from '../../../state/selectors';
import { NursesService } from 'carer-admin/src/app/shared/services/nurses/nurses.service';
import { NurseActions } from 'carer-admin/src/app/state/actions';
import { Nurse } from 'carer-admin/src/app/shared/models/nurse.model';
import { Observable } from 'rxjs';
import { SubscriptionService } from 'carer-admin/src/app/shared/services/core/subscription.service';

@Component({
  selector: 'app-view-nurse',
  templateUrl: './view-nurse.component.html',
  styleUrls: ['./view-nurse.component.scss']
})
export class ViewNurseComponent implements OnInit, OnDestroy {
selectedNurse$: Observable<Nurse>;
  constructor(private store: Store<State>,
              private ns: NursesService,
              private route: ActivatedRoute,
              private subService: SubscriptionService) {
                this.store.dispatch(NurseActions.getSelectedNurse({id: this.route.snapshot.params.id}));
               }

  ngOnInit() {
    this.selectedNurse$ = this.store.select(getSelectedNurse);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
