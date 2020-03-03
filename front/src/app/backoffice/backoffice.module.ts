import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule, MatCardModule } from '@angular/material';
import { ProjectsComponent } from './projects/projects.component';


@NgModule({
  declarations: [DashboardComponent, ProjectListComponent, ProjectsComponent],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class BackofficeModule { }
