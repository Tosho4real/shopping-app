import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppin-edit',
  templateUrl: './shoppin-edit.component.html',
  styleUrls: ['./shoppin-edit.component.css'],
})
export class ShoppinEditComponent implements OnInit, OnDestroy{
  @ViewChild('f',{static: false}) slform: NgForm;
  subscription: Subscription;
  editMode = false
  edittedItemIndex: number;
  edittedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) =>{
        this.edittedItemIndex = index;
        this.edittedItem = this.slService.getIngredient(index);
        this.editMode = true;
        this.slform.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        })

      }
    )
  }

  onSubmit(form: NgForm) {
    
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.slService.updateIngredient(this.edittedItemIndex, newIngredient)
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.slform.reset()
    this.editMode = false
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;

  }
  onDelete(){
    this.slService.deleteIngredient(this.edittedItemIndex)
    this.onClear()
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
