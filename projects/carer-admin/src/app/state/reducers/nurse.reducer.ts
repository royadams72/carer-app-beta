import { Action, createReducer, on } from '@ngrx/store';
import { Nurse } from '../../shared/models/nurse.model';

import { NurseActions } from '../actions/';
import { updateNurse } from '../actions/nurse.actions';


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
  on(NurseActions.getNurseLoaded, (state, action) => ({ ...state, selectedNurse: action.nurse})),
  on(NurseActions.updateNurse, update),
);

function update(state, action) {
  // console.log(state, action)

  return {
    ...state,
    selectedNurse: action.nurse
  };
}
export function reducer(state: NurseState | undefined, action: Action) {
  return nurseReducer(state, action);
}
