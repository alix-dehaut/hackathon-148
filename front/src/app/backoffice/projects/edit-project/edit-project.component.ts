import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/shared/interfaces/Project.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {TagsService} from "../../../shared/services/tags.service";
import {map} from "rxjs/operators";
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  public project: Project;
  public projectForm: FormGroup = new FormGroup({});
  public projectFormConfig: FormlyFieldConfig[];
  constructor(private route: ActivatedRoute, private projectsService: ProjectsService, private router: Router, private tagsService: TagsService) { }

  ngOnInit() {
    this.project = this.route.snapshot.data.project;
    this.project = {...this.project, tags: this.project.tags.map(tag => tag['@id'])}
    this.tagsService.getAllTags().pipe(
      map(tags => tags.map(tag => ({label: tag.label, value: tag['@id']}))),
    )
      .subscribe(
      tags => {
        this.projectFormConfig = [
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: 'Titre',
              minLength: 2,
            }
          },
          {
            key: 'description',
            type: 'input',
            templateOptions: {
              label: 'Contenu',
              minLength: 2
            }
          },
          {
            key: 'status',
            type: 'select',
            templateOptions: {
              label: 'Status',
              options: [
                { label: 'En attente', value: 'PENDING' },
                { label: 'En cours', value: 'ONGOING' },
                { label: 'Terminé', value: 'DONE' },
              ],
            }
          },
          {
            key: 'tags',
            type: 'select',
            templateOptions: {
              label: 'Tags',
              multiple: true,
              options: tags
            }
          }
        ]
      }
    )
  }

  onSubmit(project: Project) {
    this.projectsService.editProject(project).subscribe(
      project => this.router.navigate(['/backoffice/show-project/' + project.id])
    )
  }

}
