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
  (state: NurseState) => {
    if (state.selectedNurse) {
    return state.selectedNurse;
    }

  }
);

export const getSelectedFormControl = createSelector(
  selectedNurse,
  (state: NurseState, props: any) => {
    if (state.selectedNurse) {
    const selected = props.selected;
    console.log(props.selected);
    return state.selectedNurse[selected];
    }
  }
);

