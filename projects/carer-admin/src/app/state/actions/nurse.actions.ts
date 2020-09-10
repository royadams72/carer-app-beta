import { createAction, props } from '@ngrx/store';
import { Nurse, Schedule } from '../../shared/models/nurse.model';

export const loadNurses = createAction(
  '[NurseState] Load Nurses'
);

export const loadNursesComplete = createAction(
  '[NurseState] Nurses Loaded', props<{nurses: Nurse[]}>()
);

export const getNurse = createAction(
  '[NurseState] Get Nurse', props<{id: string}>()
);

export const getNurseLoaded = createAction(
  '[NurseState] Get Nurse Loaded', props<{nurse: Nurse}>()
);

export const addNurse = createAction(
  '[NurseState] Adding Nurse', props<{nurse: Nurse}>()
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
// deleteNurseAppointmentFaild
export type NurseActionsUnion = ReturnType<typeof loadNurses | typeof loadNursesComplete |
            typeof getNurse | typeof getNurseLoaded | typeof addNurse | typeof updateNurse | typeof nurseUpdated |
            typeof addNurseAppointment | typeof nurseAppointmentAdded | typeof updateNurseAppointment | typeof appointmentUpdated |
            typeof deleteNurseAppointment | typeof appointmentDeleted | typeof nurseAppointmentFaild>;
