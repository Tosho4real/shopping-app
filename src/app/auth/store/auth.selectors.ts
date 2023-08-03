import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getUser = createSelector(getAuthState, (state) => {
  return state.user;
});
export const getError = createSelector(getAuthState, (state) => {
  return state.authError;
});
export const getAuthLoading = createSelector(getAuthState, (state) => {
  return state.loading;
});
