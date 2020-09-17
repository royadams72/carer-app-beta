import { Action, createReducer, on } from '@ngrx/store';
import { Nurse, Schedule } from '../../shared/models/nurse.model';

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
  on(NurseActions.addNurseAppointment, addNurseAppointment),
  on(NurseActions.updateNurseAppointment, updateNurseAppointment),
  on(NurseActions.deleteNurseAppointment, deleteNurseAppointment)
);

function update(state: NurseState, action) {
  return {
    ...state,
    selectedNurse: action.nurse
  };
}

function addNurseAppointment(state, action) {
  return {
    ...state,
    selectedNurse: { ...state.selectedNurse, schedule: [...state.selectedNurse.schedule, action.schedule]}
  };
}

function updateNurseAppointment(state: any, action) {
  return {
    ...state,
    selectedNurse: {
      ...state.selectedNurse,
      schedule: [...state.selectedNurse.schedule.filter(s => s.id !== action.schedule.id), action.schedule]
    }
  };
}

function deleteNurseAppointment(state, action) {
  return {
    ...state,
    selectedNurse: { ...state.selectedNurse, schedule: [...state.selectedNurse.schedule.filter(s => s.id !== action.schedule.id)] }
  };
}


export function reducer(state: NurseState | undefined, action: Action) {
  return nurseReducer(state, action);
}
