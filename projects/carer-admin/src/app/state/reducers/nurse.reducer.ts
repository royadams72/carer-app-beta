import { Action, createReducer, on } from '@ngrx/store';
import { Nurse } from '../../shared/models/nurse.model';

import { NurseActions } from '../actions/';


export interface NurseState {
  nurses: Nurse[];
  selectedNurse: Nurse;
}

export const initialState: NurseState = {
  nurses: undefined,
  selectedNurse: undefined
};

const nurseReducer = createReducer(
  initialState,
  on(NurseActions.loadNurses, (state) => (state)),
  on(NurseActions.loadNursesComplete, (state, {nurses}) => ({ ...state, nurses })),
  on(NurseActions.getNurse, (state) => (state)),
  on(NurseActions.getNurseLoaded, (state, {nurse}) => ({ ...state, selectedNurse: nurse})),
);

export function reducer(state: NurseState | undefined, action: Action) {
  return nurseReducer(state, action);
}
