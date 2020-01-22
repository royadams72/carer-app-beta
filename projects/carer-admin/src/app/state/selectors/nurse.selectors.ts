import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NurseState, reducer as  nurseReducer} from '../reducers/nurse.reducer';
import { State } from '../reducers';

const selectNurses = (state: State) => state.nurseState;

export const nurses = createSelector(
  selectNurses,
  (state: NurseState) => state.nurses
);

const selectedNurse = (state: State) => state.nurseState;
export const nurseSelected = createSelector(
  selectedNurse,
  (state: NurseState) => state.selectedNurse
);

export const nursesVM = createSelector(
  selectNurses,
  (state: NurseState) => {
    console.log(state.nurses);
    return state.nurses;
  }
);

