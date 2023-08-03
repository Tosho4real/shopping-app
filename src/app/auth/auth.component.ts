import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import * as AuthSelectors from './store/auth.selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  closeSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.closeSub.add(
      this.store
        .select(AuthSelectors.getAuthLoading)
        .subscribe((AuthLoading) => {
          this.isLoading = AuthLoading;
        })
    );

    this.closeSub.add(
      this.store.select(AuthSelectors.getError).subscribe((error) => {
        this.error = error;

        if (this.error) {
          this.showError(this.error);
        }
      })
    );
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.error = null;

    if (this.isLoginMode) {
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        AuthActions.loginStart({
          payload: { email: email, password: password },
        })
      );
    } else {
      this.store.dispatch(
        AuthActions.signupStart({
          payload: { email: email, password: password },
        })
      );
    }

    // authObs.subscribe({
    //   next: (resData) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (errorMessage) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.showError(errorMessage);
    //     this.isLoading = false;
    //   },
    // });

    form.reset();
  }
  onHandleError() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showError(message: string) {
    // const alertCmp = new AlertComponent()
    const alertCmpFatory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();

    const componentRef = hostViewContainer.createComponent(alertCmpFatory);

    componentRef.instance.message = message;
    this.closeSub.add(
      componentRef.instance.close.subscribe(() => {
        // this.closeSub.unsubscribe();
        hostViewContainer.clear();
      })
    );
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
