import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const authReducerInternal = createReducer(
  initialState,
  on(AuthActions.authenticateSuccess, (state, action) => {
    const user = new User(
      action.payload.email,
      action.payload.userId,
      action.payload.token,
      action.payload.expirationDate
    );

    return {
      ...state,
      user: user,
      authError: null,
      loading: false,
    };
  }),

  on(AuthActions.logout, (state) => {

    return {
      ...state,
      user: null,
      authError: null,
    };
  }),

  on(AuthActions.loginStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),

  on(AuthActions.signupStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),

  on(AuthActions.authenticateFailed, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.payload,
      loading: false,
    };
  }),
  on(AuthActions.clearError, (state) => {
    return {
      ...state,
      authError: null,
    };
  })
);

export function authReducer(state: State | undefined, action: Action) {
  return authReducerInternal(state, action);
}
