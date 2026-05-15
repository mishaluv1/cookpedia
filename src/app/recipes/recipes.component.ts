import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,SearchPipe,FormsModule,NgxPaginationModule, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any=[]
  dummyAllrecipes:any=[]
  cusineArray:any=[]
  mealTypeArray:any=[]
  searchKey:string=""
  p:number=1;

  constructor(private api:ApiService){}

ngOnInit(){
  this.getAllRecipes()
}

    getAllRecipes(){
      this.api.getAllRecipeAPI().subscribe((res:any)=>{
         this.allRecipes=res
         this.dummyAllrecipes=res
         
         
         this.allRecipes.forEach((item:any)=>{

           !this.cusineArray.includes(item.cuisine) && this.cusineArray.push(item.cuisine)
           

         })
        const mealArray= this.allRecipes.map((item:any)=> item.mealType)
        console.log(mealArray);


        const flatMeal=mealArray.flat(Infinity)
        flatMeal.forEach((item:any)=>{

          !this.mealTypeArray.includes(item) && this.mealTypeArray.push(item)
          

        })
console.log(this.mealTypeArray);
         
      })
    }
    filterAllRecipes(key:string,value:string){

      this.allRecipes= this.dummyAllrecipes.filter((item:any)=>item[key].includes(value))



    }
}
