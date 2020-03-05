import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/shared/interfaces/Project.interface';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() projects:Project[];

}
