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
  on(NurseActions.addNurseAppointment, addNurseAppointment),
  on(NurseActions.updateNurseAppointment, updateNurseAppointment),
);

function update(state, action) {
  return {
    ...state,
    selectedNurse: action.nurse
  };
}

function updateNurseAppointment(state, action) {
  const {selectedNurse}: {selectedNurse: Nurse} = state;
  console.log(selectedNurse);
  const { schedule: newSchedule, schedule: {id: sid}, id} = action;
  const scheduleToRemoveIndex = selectedNurse.schedule.findIndex((s) => s.id === sid);
  selectedNurse.schedule.splice(scheduleToRemoveIndex, 1);
  selectedNurse.schedule.push(newSchedule);
  console.log(newSchedule, selectedNurse.schedule);
  return {
    ...state,
    selectedNurse
  };
}

function addNurseAppointment(state, action) {
  console.log(action);
  const {selectedNurse} = state;
  selectedNurse.schedule.push(action.schedule);
  return {
    ...state,
    selectedNurse
  };
}
export function reducer(state: NurseState | undefined, action: Action) {
  return nurseReducer(state, action);
}
