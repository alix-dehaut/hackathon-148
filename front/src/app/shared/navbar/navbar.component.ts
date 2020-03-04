import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router:Router) { }
  ngOnInit() {
    console.log(this.authService.getLoggedUser());
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }
}
