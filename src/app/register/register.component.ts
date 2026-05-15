import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerform: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.registerform = this.fb.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
    });
  }

  register() {
    if (this.registerform.valid) {
      const username = this.registerform.value.username;
      const email = this.registerform.value.email;
      const password = this.registerform.value.password;

      this.api.registerAPI({ username, email, password }).subscribe({
        next: (res: any) => {
          alert('Registration successful! Please login.');
          this.router.navigateByUrl('/login');
          this.registerform.reset();
        },
        error: (err: any) => {
          console.log(err);
          alert(err.error || 'Registration failed');
        }
      });
    } else {
      alert("Please fill the form correctly.");
    }
  }

}
