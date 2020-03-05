import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material';
import { ProjectsComponent } from './projects/projects.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectsService } from '../shared/services/projects.service';


@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    SharedModule
  ],
  providers: [
    ProjectsService
  ]
})
export class DashboardModule { }
