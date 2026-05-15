import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url: string = environment.serverUrl

  constructor(private http: HttpClient) { }


  getAllRecipeAPI() {
    return this.http.get(`${this.server_url}/get-allRecipes`)
  }

  addTestimonyAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  // Register API
  registerAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-user`, reqBody);
  }

  // Login API
  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody);
  }

  // append token
  appendToken() {
    let headers: any = {
      'Content-Type': 'application/json'
    }
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      headers['Authorization'] = `Bearer ${token}`
    }
    return { headers }
  }

  // Add Recipe API
  addRecipeAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-recipe`, reqBody, this.appendToken());
  }

  // get a recipe
  getARecipeAPI(id: any) {
    return this.http.get(`${this.server_url}/recipe/${id}/view`)
  }

  // get approved testimonials
  getApprovedTestimonialsAPI() {
    return this.http.get(`${this.server_url}/get-approved-testimonials`)
  }

  // delete recipe (admin)
  deleteRecipeAPI(id: any) {
    return this.http.delete(`${this.server_url}/recipe/${id}/delete`, this.appendToken())
  }

  // update recipe status (admin)
  updateRecipeStatusAPI(id: any, status: any) {
    return this.http.patch(`${this.server_url}/recipe/${id}/status?status=${status}`, {}, this.appendToken())
  }

  // get all recipes (admin)
  getAllRecipesAdminAPI() {
    return this.http.get(`${this.server_url}/get-all-recipes-admin`, this.appendToken())
  }

  // get all testimonials (admin)
  getAllTestimonialsAPI() {
    return this.http.get(`${this.server_url}/get-all-testimonials`, this.appendToken())
  }

  // update testimony status (admin)
  updateTestimonyStatusAPI(id: any, status: any) {
    return this.http.patch(`${this.server_url}/testimony/${id}/status?status=${status}`, {}, this.appendToken())
  }

  // get all users (admin)
  getAllUsersAPI() {
    return this.http.get(`${this.server_url}/get-all-users`, this.appendToken())
  }

  // update user status (admin)
  updateUserStatusAPI(id: any, status: any) {
    return this.http.patch(`${this.server_url}/user/${id}/status?status=${status}`, {}, this.appendToken())
  }

  // add review
  addReviewAPI(id: any, reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/${id}/review`, reqBody)
  }

  // save recipe
  saveRecipeAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/recipe/save`, reqBody, this.appendToken())
  }

  // get user saved recipes
  getUserSavedRecipesAPI() {
    return this.http.get(`${this.server_url}/get-saved-recipes`, this.appendToken())
  }

  // remove saved recipe
  removeSavedRecipeAPI(id: any) {
    return this.http.delete(`${this.server_url}/recipe/${id}/remove-saved`, this.appendToken())
  }
}
