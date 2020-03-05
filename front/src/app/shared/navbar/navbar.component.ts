import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router:Router) { }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }
}
