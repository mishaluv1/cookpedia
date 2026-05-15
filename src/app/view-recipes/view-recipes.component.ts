import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {

  recipe: any = {};
  userReview: any = { rating: 5, message: "" };

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      const { id } = res;
      this.getRecipe(id);
    })
  }

  getRecipe(id: any) {
    this.api.getARecipeAPI(id).subscribe((res: any) => {
      this.recipe = res;
    })
  }

  saveRecipe() {
    if(sessionStorage.getItem("user")) {
        const { _id, name, image } = this.recipe;
        this.api.saveRecipeAPI({ recipeId: _id, name, image }).subscribe({
            next: (res: any) => alert("Recipe saved successfully!"),
            error: (err: any) => alert(err.error)
        })
    } else {
        alert("Please login to save recipes!");
    }
  }

  addReview() {
    if(sessionStorage.getItem("user")) {
        const user = JSON.parse(sessionStorage.getItem("user") || "");
        const reviewData = {
            name: user.username,
            rating: this.userReview.rating,
            message: this.userReview.message
        };
        this.api.addReviewAPI(this.recipe._id, reviewData).subscribe((res: any) => {
            alert("Review added successfully!");
            this.recipe = res;
            this.userReview = { rating: 5, message: "" };
        })
    } else {
        alert("Please login to give review!");
    }
  }
}
