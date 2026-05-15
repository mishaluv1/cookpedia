import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {

    this.errorMessage = '';

    // ✅ VALIDATION
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.isLoading = true;

    try {
      // ⏳ fake API delay
      await this.fakeAuthDelay();

      console.log('Login submitted', {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      });

      // ✅ SIMPLE LOGIN CHECK (demo)
      const isValidUser =
        this.email === 'admin@gmail.com' &&
        this.password === '123456';

      if (isValidUser) {

        // 💾 store login state
        localStorage.setItem('user', JSON.stringify({
          email: this.email
        }));

        // 🚀 redirect to home
        this.router.navigate(['/home']);

      } else {
        this.errorMessage = 'Invalid email or password.';
      }

    } catch (err) {
      this.errorMessage = 'Something went wrong. Try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private fakeAuthDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}