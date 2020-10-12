import { createAction, props } from '@ngrx/store';
import { Nurse, Schedule } from '../../shared/models/nurse.model';

export const loadNurses = createAction(
  '[NurseState] Load Nurses'
);

export const loadNursesComplete = createAction(
  '[NurseState] Nurses Loaded', props<{nurses: Nurse[]}>()
);

export const getSelectedNurse = createAction(
  '[NurseState] Get Selected Nurse', props<{id: string}>()
);

export const selectedNurseLoaded = createAction(
  '[NurseState] Selected Nurse Loaded', props<{nurse: Nurse}>()
);

export const clearSelectedNurse = createAction(
  '[NurseState] Selected Nurse Cleared'
);

export const addNurse = createAction(
  '[NurseState] Adding Nurse', props<{nurse: Nurse}>()
);

export const nurseAdded = createAction(
  '[NurseState] Nurse Added'
);

export const saveNurseForm = createAction(
  '[NurseState] Saving Part of Nurse', props<{key: any, value: any}>()
);

export const saveNurseFormDone = createAction(
  '[NurseState] Save Part of Nurse Done'
);

export const clearTempNurse = createAction(
  '[NurseState] Temp Nurse Cleared'
);

export const updateNurse = createAction(
  '[NurseState] Updating Nurse', props<{nurse: Nurse}>()
);

export const nurseUpdated = createAction(
  '[NurseState] Nurse Updated'
);

export const addNurseAppointment = createAction(
  '[NurseState] Adding Appointment', props<{id: string, schedule: Schedule}>()
);

export const nurseAppointmentAdded = createAction(
  '[NurseState] Appointment Added'
);

export const updateNurseAppointment = createAction(
  '[NurseState] Updating Appointment', props<{nurseId: string, schedule: Schedule}>()
);

export const appointmentUpdated = createAction(
  '[NurseState] Appointment Updated'
);

export const deleteNurseAppointment = createAction(
  '[NurseState] deleting Appointment', props<{nurseId: string, schedule: Schedule}>()
);

export const appointmentDeleted = createAction(
  '[NurseState] Appointment deleted'
);

export const nurseAppointmentFaild = createAction(
  '[NurseState] Appointment Faild'
);

export type NurseActionsUnion = ReturnType<typeof loadNurses | typeof loadNursesComplete |
            typeof getSelectedNurse | typeof selectedNurseLoaded | typeof addNurse | typeof nurseAdded | typeof updateNurse|
            typeof nurseUpdated | typeof addNurseAppointment | typeof nurseAppointmentAdded | typeof updateNurseAppointment |
            typeof appointmentUpdated | typeof deleteNurseAppointment | typeof appointmentDeleted | typeof nurseAppointmentFaild |
            typeof saveNurseForm | typeof saveNurseFormDone | typeof clearTempNurse>;
