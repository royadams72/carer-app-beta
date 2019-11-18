import { createAction, props } from '@ngrx/store';
import { Nurse } from '../../shared/models/nurse.model';

export const loadNurses = createAction(
  '[NurseState] Load Nurses'
);

export const loadNursesComplete = createAction(
  '[NurseState] Nurses Loaded', props<{nurse: Nurse[]}>()
);

export type NurseActionsUnion = ReturnType<typeof loadNurses | typeof loadNursesComplete>;
