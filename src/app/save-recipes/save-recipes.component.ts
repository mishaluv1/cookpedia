import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-save-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './save-recipes.component.html',
  styleUrl: './save-recipes.component.css'
})
export class SaveRecipesComponent {

  allSavedRecipes: any = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getSavedRecipes();
  }

  getSavedRecipes() {
    this.api.getUserSavedRecipesAPI().subscribe((res: any) => {
      this.allSavedRecipes = res;
    })
  }

  removeRecipe(id: any) {
    this.api.removeSavedRecipeAPI(id).subscribe((res: any) => {
      this.getSavedRecipes();
    })
  }
}
