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
export type NurseActionsUnion = ReturnType<typeof loadNurses | typeof loadNursesComplete | typeof getNurse | typeof getNurseLoaded>;
