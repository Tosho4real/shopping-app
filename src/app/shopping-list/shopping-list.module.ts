import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppinEditComponent } from './shoppin-edit/shoppin-edit.component';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [ShoppingListComponent, ShoppinEditComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
    SharedModule,
  ],
  // providers: [LoggingService],
})
export class ShoppingListModule {}
