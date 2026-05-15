import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PnfComponent } from './pnf/pnf.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';
import { AdminComponent } from './admin/admin.component';
import { SaveRecipesComponent } from './save-recipes/save-recipes.component';

export const routes: Routes = [

  {path:"" ,component:HomeComponent ,title:"home"},
  {path:"about" ,component:AboutComponent ,title:"about"},
  {path:"contact" ,component:ContactComponent ,title:"contact"},
  {path:"login" ,component:LoginComponent ,title:"login"},
  {path:"register" ,component:RegisterComponent ,title:"register"},
  {path:"recipe" ,component:RecipesComponent ,title:"recipe"},
  {path:"add-recipe", component:AddRecipeComponent, title: "Add Recipe"},
  {path:"recipe/:id/view", component: ViewRecipesComponent, title: "View Recipe"},
  {path:"admin", component: AdminComponent, title: "Admin Dashboard"},
  {path:"saved-recipes", component: SaveRecipesComponent, title: "Saved Recipes"},


  {path:"**" ,component:PnfComponent ,title:"Page Not Found"}







];
