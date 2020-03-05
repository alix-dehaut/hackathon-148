import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectsService } from 'src/app/shared/services/projects.service';
import { Project } from 'src/app/shared/interfaces/Project.interface';

@Injectable()
export class ProjectsResolver implements Resolve<Project[]> {
  constructor(private projectService: ProjectsService) {}
  resolve(): Observable<Project[]> {
    return this.projectService.getAllProjects();
  }
}
