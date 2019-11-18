import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { NurseState, reducer as  nurseReducer} from './nurse.reducer';



export interface State {
  nurseState: NurseState;
}

export const reducers: ActionReducerMap<State> = {
  nurseState: nurseReducer
};



