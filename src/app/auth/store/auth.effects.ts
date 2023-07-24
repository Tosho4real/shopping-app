import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  register?: boolean;
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

  return AuthActions.authenticateSuccess({
    payload: {
      email: email,
      userId: userId,
      token: token,
      expirationDate: expirationDate,
    },
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFailed({ payload: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exists.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
  }
  //..
  return of(AuthActions.authenticateFailed({ payload: errorMessage }));
};

const handleLogin = () => {};

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((action) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              environment.firebaseAPIKey,
            {
              email: action.payload.email,
              password: action.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  authRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess, AuthActions.logout),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  /**  authSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
  */

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
