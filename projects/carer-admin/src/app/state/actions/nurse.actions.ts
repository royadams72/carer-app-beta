import { createAction, props } from '@ngrx/store';
import { Nurse } from '../../shared/models/nurse.model';

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
  '[NurseState] Updating Nurse', props<{nurseId: string, nurse: Nurse}>()
);

export const nurseUpdated = createAction(
  '[NurseState] Nurse Updated'
);

export type NurseActionsUnion = ReturnType<typeof loadNurses | typeof loadNursesComplete |
            typeof getNurse | typeof getNurseLoaded | typeof addNurse | typeof updateNurse | typeof nurseUpdated>;
