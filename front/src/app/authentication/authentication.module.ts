import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    AuthService
  ]
})
export class AuthenticationModule { }
