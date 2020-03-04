import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/User.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public user$: Observable<User>;
  public userForm: FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params:ParamMap) => {
        return this.userService.getUser(Number(params.get('id')))
      })
    );
  }

  onSubmit(user: User) {
    this.userService.editUser(user).subscribe(
      user => this.router.navigate(['backoffice'])
    )
  }

}
