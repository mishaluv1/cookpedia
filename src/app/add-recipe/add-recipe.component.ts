import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      prepTimeMinutes: [0, [Validators.required, Validators.min(0)]],
      cookTimeMinutes: [0, [Validators.required, Validators.min(0)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      difficulty: ['Easy', Validators.required],
      cuisine: ['', Validators.required],
      caloriesPerServing: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      mealType: ['', Validators.required]
    });
  }

  getFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.recipeForm.patchValue({
          image: reader.result
        });
      };
    }
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formData = { ...this.recipeForm.value };
      
      // Convert comma-separated strings to arrays
      formData.ingredients = formData.ingredients.split(',').map((i: string) => i.trim());
      formData.instructions = formData.instructions.split(',').map((i: string) => i.trim());
      formData.mealType = formData.mealType.split(',').map((i: string) => i.trim());

      this.api.addRecipeAPI(formData).subscribe({
        next: (res: any) => {
          alert('Recipe added successfully!');
          this.router.navigateByUrl('/recipe');
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error || 'Failed to add recipe');
        }
      });
    } else {
      alert('Please fill the form correctly.');
    }
  }
}
