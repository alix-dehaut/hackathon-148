import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/User.interface';
import { FormGroup } from '@angular/forms';
import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { Project } from 'src/app/shared/interfaces/Project.interface';
import { ProjectsComponent } from 'src/app/dashboard/projects/projects.component';
import { ProjectUserService } from 'src/app/shared/services/project-user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {
  public user: User;
  public formGroup = new FormGroup({})
  public model = {
    agent: '',
    project: ''
  };
  public formConfig: FormlyFieldConfig[] = [
    {
      key: 'project',
      type: 'select',
      templateOptions : {
        label: 'Sélectioner le projet à assigner à l\'agent',
        options: []
      }
    }
  ];
  constructor(private activatedRoute: ActivatedRoute, private projectUserSerivce: ProjectUserService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: {user: User, projects: Project[]}) => {
        this.user = data.user
        this.model.agent = this.user['@id'];

        const projects = data.projects.map(
          project => ({label:project.name, value: project['@id']})
        );
        this.formConfig[0].templateOptions.options = projects
      }
    )
  }

  onSubmit(model) {
    this.projectUserSerivce.createProjectUser(model).subscribe(
      result => location.reload()
    )
  }

}
