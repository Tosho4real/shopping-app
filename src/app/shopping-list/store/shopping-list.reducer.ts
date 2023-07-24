import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

const shoppingListReducerInternal = createReducer(
  initialState,
  on(ShoppingListActions.AddIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload],
    };
  }),

  on(ShoppingListActions.AddIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.payload],
    };
  }),

  on(ShoppingListActions.updateIngredient, (state, action) => {
    const ingredient = state.ingredients.indexOf[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.payload,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),

  on(ShoppingListActions.deleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
        return ingredientIndex !== state.editedIngredientIndex;
      }),
      editedIngredientIndex: -1,
      editedIngredient: null,
    };
  }),

  on(ShoppingListActions.startEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.payload,
      editedIngredient: { ...state.ingredients[action.payload] },
    };
  }),

  on(ShoppingListActions.stopEdit, (state, action) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);

export function shoppingListReducer(state: State | undefined, action: Action) {
  return shoppingListReducerInternal(state, action);
}
