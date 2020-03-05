import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Project } from 'src/app/shared/interfaces/Project.interface';
import { AuthService } from 'src/app/authentication/auth.service';
import { TagsService } from 'src/app/shared/services/tags.service';
import { map } from 'rxjs/operators';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  public form = new FormGroup({});
  public model: Project = {
    name: '',
    description: '',
    tags: []
  };
  public fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Nom du projet',
        required: true
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description du projet',
        required: true
      }
    },
    {
      key: 'tags',
      type: 'select',
      templateOptions: {
        label: 'Tags du projet',
        options: [],
        multiple: true
      }
    }
  ];

  constructor(private authService: AuthService, private tagsService: TagsService, private projectService: ProjectsService, private router: Router) { }

  ngOnInit() {
    this.model.creatorId = this.authService.getLoggedUser().userId;
    this.tagsService.getAllTags().pipe(
      map(tags => tags.map(tag => ({label: tag.label, value: tag['@id']})))
    ).subscribe(
      tags => {
        console.log(tags)
        this.fields[2].templateOptions.options = tags
      }
    )
  }

  submit(project: Project) {
    this.projectService.addProject(project).subscribe(
      project => this.router.navigate(['/backoffice/show-project/'+project.id])
    )
  }

}
