import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shoppin-edit',
  templateUrl: './shoppin-edit.component.html',
  styleUrls: ['./shoppin-edit.component.css'],
})
export class ShoppinEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slform: NgForm;
  subscription: Subscription = new Subscription();
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store.select('shoppingList').subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.slform.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      })
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        ShoppingListActions.updateIngredient({ payload: newIngredient })
      );
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(
        ShoppingListActions.AddIngredient({ payload: newIngredient })
      );
    }
    this.slform.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onClear() {
    this.slform.reset();
    this.editMode = false;
  }
  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.onClear();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
}
