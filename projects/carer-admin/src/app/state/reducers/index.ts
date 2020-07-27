import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { NurseState, reducer as  nurseReducer} from './nurse.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';


export interface State {
  nurseState: NurseState;
}

export const reducers: ActionReducerMap<State> = {
  nurseState: nurseReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<State>): ActionReducer<State> {
  return localStorageSync({ keys: ['nurseState'] , rehydrate: true, storage: sessionStorage })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [ localStorageSyncReducer ];

