import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/User.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public user: User;
  public userForm: FormGroup = new FormGroup({});
  public userFormConfig: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        type: 'email',
        minLength: 7,
        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" n'est pas une addresse mail valide`,
        },
      },
    },
    {
      key: 'firstname',
      type: 'input',
      templateOptions: {
        label: 'Prénom',
        minLength: 2
      }
    },
    {
      key: 'lastname',
      type: 'input',
      templateOptions: {
        label: 'Nom',
        minLength: 2
      }
    }
  ]
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    delete this.user.projectUsers;
    delete this.user.projects;
  }

  onSubmit(user: User) {
    this.userService.editUser(user).subscribe(
      user => this.router.navigate(['backoffice/show-user/' + user.id])
    )
  }

}
