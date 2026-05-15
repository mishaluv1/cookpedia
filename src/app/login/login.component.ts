import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  rememberMe = false;

  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, private api: ApiService) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;

    const reqBody = { email: this.email, password: this.password };

    this.api.loginAPI(reqBody).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log('Login successful', res);

        // Store user and token
        sessionStorage.setItem('user', JSON.stringify(res.user));
        sessionStorage.setItem('token', res.token);

        // Reset form
        this.email = "";
        this.password = "";

        // 🚀 NAVIGATE TO HOME PAGE (empty path)
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        this.isLoading = false;
        console.log('Login failed', err);
        this.errorMessage = err.error || 'Invalid email or password. Please try again.';
      }
    });
  }
}