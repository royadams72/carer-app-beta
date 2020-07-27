import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NurseState, reducer as  nurseReducer} from '../reducers/nurse.reducer';
import { State } from '../reducers';

const selectNurses = (state: State) => state.nurseState;

export const nurses = createSelector(
  selectNurses,
  (state: NurseState) => state.nurses
);

const selectedNurse = (state: State) => state.nurseState;

export const getSelectedNurse = createSelector(
  selectedNurse,
  (state: NurseState) => {
    if (state.selectedNurse) {
    return state.selectedNurse;
    }

  }
);
export const getSelectedNurseId = createSelector(
  selectedNurse,
  (state: NurseState) => {
    if (state.selectedNurse) {
    return state.selectedNurse.id;
    }

  }
);

export const getSchedule = createSelector(
  selectedNurse,
  (state: NurseState) => {
    if (state.selectedNurse) {
    return state.selectedNurse.schedule;
    }

  }
);

// export const getSelectedNurse = createSelector(
//   selectedNurse,
//   (state: NurseState, props: any) => {
//     if (state) {
//     console.log(state, props.id);
//     const selected = props.id;
//     return state.selectedNurse[selected];
//     }
//   }
// );

