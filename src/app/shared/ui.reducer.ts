import { createReducer, on } from '@ngrx/store';
import * as action from './ui.actions';

export interface State {
  isLoading: boolean;
};

const initialState: State = {
  isLoading: false
};

export const uiReducer = createReducer(
  initialState,
  on(
    action.isLoading,
    (state) => ({...state, isLoading: true}),
  ),
  on(
    action.stopLoading,
    (state) => ({...state, isLoading: false})
  )
);
