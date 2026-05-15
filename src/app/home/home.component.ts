import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allReceipes:any=[]
  allApprovedTestimonials:any=[]

  constructor(private api:ApiService){}

  ngOnInit(){
     this.getAllRecipe()
     this.getApprovedTestimonials()
  }

  getApprovedTestimonials(){
    this.api.getApprovedTestimonialsAPI().subscribe((res:any)=>{
      this.allApprovedTestimonials = res
    })
  }
  getAllRecipe(){
     
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allReceipes=res.slice(0,6)
      console.log(this.allReceipes);
      
    })
  }

}
