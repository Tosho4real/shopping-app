import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DrowdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DrowdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DrowdownDirective,
    CommonModule,
  ],
  providers: [LoggingService],

  entryComponents: [AlertComponent],
})
export class SharedModule {}
