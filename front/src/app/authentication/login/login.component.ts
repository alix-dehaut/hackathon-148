import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.authService.login({username: 'toto', password: 'tutu'}).subscribe(
      success => {
        if (success) { this.router.navigate(['/backoffice'])}
      }
    )
  }

}
