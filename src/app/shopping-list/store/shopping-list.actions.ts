import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const AddIngredient = createAction(
  '[Shopping List] Add Ingredient',
  props<{ payload: Ingredient }>()
);

export const AddIngredients = createAction(
  '[shopping List] Add Ingredients',
  props<{ payload: Ingredient[] }>()
);

export const updateIngredient = createAction(
  '[Shopping List] Update Ingredient',
  props<{ payload: Ingredient }>()
);

export const deleteIngredient = createAction(
  '[Shopping List] Delete Ingredient'
);

export const startEdit = createAction(
  '[Shopping List] Start Edit',
  props<{ payload: number }>()
);

export const stopEdit = createAction('[Shopping List] Stop Edit');
