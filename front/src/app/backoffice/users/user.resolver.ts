import {UserService} from '../../shared/services/user.service';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/interfaces/User.interface';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private userService: UserService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(Number(route.paramMap.get('id')));
  }
}
