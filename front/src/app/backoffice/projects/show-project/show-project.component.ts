import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/interfaces/Project.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss']
})
export class ShowProjectComponent implements OnInit {
  private project: Project;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.project = {
      ...this.route.snapshot.data.project,
      tags: this.route.snapshot.data.project.tags.map(tag => tag.label)
    };
  }

}
