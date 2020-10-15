import { Action, createReducer, on } from '@ngrx/store';
import { Nurse, Schedule } from '../../shared/models/nurse.model';

import { NurseActions } from '../actions/';



export interface NurseState {
  nurses: Nurse[];
  selectedNurse: Nurse;
  tempNurse: Nurse;
}

export const initialState: NurseState = {
  nurses: undefined,
  selectedNurse: undefined,
  tempNurse: undefined
};

const nurseReducer = createReducer(
  initialState,
  on(NurseActions.loadNurses, (state) => (state)),
  on(NurseActions.loadNursesComplete, (state, {nurses}) => ({ ...state, nurses })),
  on(NurseActions.getSelectedNurse, (state) => (state)),
  on(NurseActions.clearSelectedNurse, (state) => ({ ...state, selectedNurse: undefined })),
  on(NurseActions.updateNurse, updateNurse),
  on(NurseActions.addNurse, addNurse),
  on(NurseActions.selectedNurseLoaded, (state, action) => ({ ...state, selectedNurse: action.nurse})),
  on(NurseActions.saveNurseForm, saveNurseForm),
  on(NurseActions.clearTempNurse, (state) => ({ ...state, tempNurse: undefined })),
  on(NurseActions.addNurseAppointment, addNurseAppointment),
  on(NurseActions.updateNurseAppointment, updateNurseAppointment),
  on(NurseActions.deleteNurseAppointment, deleteNurseAppointment)
);


function addNurse(state: NurseState, action) {
  return {
    ...state,
    nurses: [ ...state.nurses,  action.nurse ]
  };
}


function saveNurseForm(state: NurseState, action) {
  return {
    ...state,
    tempNurse: { ...state.tempNurse, [action.key]: action.value }
  };
}

function updateNurse(state: NurseState, action) {
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
