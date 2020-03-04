import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<{token: string}>('https://localhost:8443/api/login_check', {email: user.email, password: user.password})
      .pipe(
        tap(token => this.doLoginUser(token.token)),
        mapTo(true),
        catchError(error => {
          console.error(error.error);
          return of(false);
        }));
  }

  logout() {
    this.loggedUser = null;
    this.removeToken();
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  private doLoginUser(token: string) {
    this.loggedUser = this.jwtHelper.decodeToken(token);
    this.storeJwtToken(token);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
