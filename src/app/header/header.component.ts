import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  loggedUser: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUser();
  }

  checkUser() {
    if (sessionStorage.getItem('user')) {
      this.loggedUser = JSON.parse(sessionStorage.getItem('user') || "");
    } else {
      this.loggedUser = null;
    }
  }

  logout() {
    sessionStorage.clear();
    this.loggedUser = null;
    this.router.navigateByUrl('/login');
  }
}
