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

function update(state, action) {
  return {
    ...state,
    selectedNurse: action.nurse
  };
}

function updateNurseAppointment(state, action) {
  const {selectedNurse}: {selectedNurse: Nurse} = state;
  const { schedule: updatedSchedule, id} = action;
  const scheduleToRemoveIndex = updatedSchedule ?
  selectedNurse.schedule.findIndex((s: Schedule) => s.id === updatedSchedule.id) : undefined;

  if (scheduleToRemoveIndex  !== undefined) {
    selectedNurse.schedule.splice(scheduleToRemoveIndex, 1);
    selectedNurse.schedule.push(updatedSchedule);
    return {
      ...state,
      selectedNurse
    };
  }

}

function addNurseAppointment(state, action) {
  const {selectedNurse} = state;
  selectedNurse.schedule.push(action.schedule);
  return {
    ...state,
    selectedNurse
  };
}

function deleteNurseAppointment(state, action) {
  const {selectedNurse}: {selectedNurse: Nurse} = state;
  const {scheduleId} = action;
  const scheduleToRemoveIndex = scheduleId  ?
  selectedNurse.schedule.findIndex((s: Schedule) => s.id === scheduleId ) : undefined;

  if (scheduleToRemoveIndex !== undefined) {

    selectedNurse.schedule.splice(scheduleToRemoveIndex, 1);
    return {
      ...state,
      selectedNurse
    };
  }

}
export function reducer(state: NurseState | undefined, action: Action) {
  return nurseReducer(state, action);
}
