import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AnonymousGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router){}

  canActivate(): boolean {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true
  }
}
