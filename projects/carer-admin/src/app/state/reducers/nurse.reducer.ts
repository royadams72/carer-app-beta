import { Action, createReducer, on } from '@ngrx/store';
import { Nurse } from '../../shared/models/nurse.model';

import { NurseActions } from '../actions/';


export interface NurseState {
  nurse: Nurse[];
}

export const initialState: NurseState = {
  nurse: undefined,
};

const nurseReducer = createReducer(
  initialState,
  on(NurseActions.loadNurses, (state) => (state)),
  on(NurseActions.loadNursesComplete, (state, {nurse}) => {
   return ({ ...state, nurse });
  }

));

export function reducer(state: NurseState | undefined, action: Action) {
  return nurseReducer(state, action);
}
