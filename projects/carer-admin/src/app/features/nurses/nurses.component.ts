import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../state/reducers';
import {  nurses } from '../../state/selectors';
import { NursesService } from '../../shared/services/nurses/nurses.service';
import { NurseActions } from '../../state/actions';
import { Nurse } from '../../shared/models/nurse.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.scss']
})
export class NursesComponent implements OnInit {
nurses$: Observable<Nurse[]>;
  constructor(private store: Store<State>, private ns: NursesService) {
    // this.store.dispatch(NurseActions.loadNurses());
  }

  ngOnInit(): void {
    this.nurses$ = this.store.select(nurses);
  }

}
