import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {}

  onSaveData() {
    this.dataStorageService.storeRecipe();
  }
  onFetchData() {
    this.dataStorageService.fetchRecipe().subscribe();
  }
}
