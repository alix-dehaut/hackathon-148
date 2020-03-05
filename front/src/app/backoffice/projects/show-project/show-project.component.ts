import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/interfaces/Project.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss']
})
export class ShowProjectComponent implements OnInit {
  public project: Project;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: {project: Project}) => this.project = {...data.project, tags: data.project.tags.map((tag:any) => tag.label)}
    )
  }

}
