import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/reducers';
import { NurseActions } from './state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'carer-admin';
 constructor(private store: Store<State>) {}
  ngOnInit(): void {
    console.log('loadNurses');
    this.store.dispatch(NurseActions.loadNurses());
  }
}
