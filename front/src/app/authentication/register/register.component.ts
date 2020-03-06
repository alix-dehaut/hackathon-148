import { Component } from '@angular/core';
import { User } from 'src/app/shared/interfaces/User.interface';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	public user: User = {email:'',isAdmin:false};
	public registerForm: FormGroup = new FormGroup({});
	public registerFormConfig: FormlyFieldConfig[] = [
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
		},
		{
			key: 'plainPassword',
			type: 'input',
			templateOptions: {
			type: 'password',
			label: 'Mot de passe',
			minLength: 8,
			pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/
			},
			validation: {
				messages: {
				  pattern: (error, field: FormlyFieldConfig) => `Le mot de passe n'est pas valide, il faut 10 caractères, une majuscule, un chiffre et un caractère spécial`,
				},
			  },
		  }

	  ]
	constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }
	onSubmit(user: User) {
		this.userService.createUser(user).subscribe(
		user => this.router.navigate(['/connexion'])
		)
	}

}
