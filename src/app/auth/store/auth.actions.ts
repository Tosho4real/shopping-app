import { createAction, props } from '@ngrx/store';

//login
export const authenticateSuccess = createAction(
  '[Auth] Login',
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    };
  }>()
);

export const logout = createAction('[Auth] Logout');

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{
    payload: {
      email: string;
      password: 'string';
    };
  }>()
);

export const authenticateFailed = createAction(
  '[Auth] Login fail',
  props<{
    payload: string;
  }>()
);

// sign up
export const signupStart = createAction(
  '[Auth] Sign up Start',
  props<{ payload: { email: string; password: string } }>()
);

export const clearError = createAction('[Auth] Clear Error');
