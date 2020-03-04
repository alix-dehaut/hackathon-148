import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailControl = new FormControl('')
  passwordControl = new FormControl('')
  loginForm: FormGroup;

  constructor(private authService: AuthService, public router: Router, private fromBuilder: FormBuilder) {
    this.loginForm = this.fromBuilder.group({
      email: this.emailControl,
      password: this.passwordControl
    })
  }

  onSubmit(loginData: {email: string, password: string}): void {
    this.authService.login(loginData).subscribe(
      success => {
        if (success) { this.router.navigate(['/backoffice'])}
      }
    )
  }

}
