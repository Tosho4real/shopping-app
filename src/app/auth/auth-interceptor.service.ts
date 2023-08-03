import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authSelector from './store/auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(authSelector.getUser).pipe(
      take(1),
      map((authState) => {
        return authState;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        // ...
        const ModifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(ModifiedReq);
      })
    );
  }
}
