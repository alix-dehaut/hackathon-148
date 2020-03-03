import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/interfaces/Project.interface';
import { ProjectsService } from 'src/app/shared/services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public projects: Project[];
  constructor(private projectsService: ProjectsService){}
  ngOnInit(){
    this.projectsService.getAllProjects().subscribe(
      projects => this.projects = projects
    )
  }
}
