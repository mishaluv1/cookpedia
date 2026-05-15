import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  allRecipes: any = [];
  allUsers: any = [];
  allTestimonials: any = [];
  activeTab: string = 'recipes';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.api.getAllRecipesAdminAPI().subscribe((res: any) => this.allRecipes = res);
    this.api.getAllUsersAPI().subscribe((res: any) => this.allUsers = res);
    this.api.getAllTestimonialsAPI().subscribe((res: any) => this.allTestimonials = res);
  }

  // Recipe Management
  updateRecipeStatus(id: any, status: string) {
    this.api.updateRecipeStatusAPI(id, status).subscribe((res: any) => {
      alert(`Recipe ${status} successfully!`);
      this.fetchData();
    })
  }

  deleteRecipe(id: any) {
    if(confirm("Are you sure you want to delete this recipe?")) {
      this.api.deleteRecipeAPI(id).subscribe((res: any) => {
        alert("Recipe deleted successfully!");
        this.fetchData();
      })
    }
  }

  // User Moderation
  updateUserStatus(id: any, status: string) {
    this.api.updateUserStatusAPI(id, status).subscribe((res: any) => {
      alert(`User ${status} successfully!`);
      this.fetchData();
    })
  }

  // Testimony Moderation
  updateTestimonyStatus(id: any, status: string) {
    this.api.updateTestimonyStatusAPI(id, status).subscribe((res: any) => {
      alert(`Testimony ${status} successfully!`);
      this.fetchData();
    })
  }
}
