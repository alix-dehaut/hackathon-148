import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatSortModule } from '@angular/material';
import { ProjectsComponent } from './projects/projects.component';
import { AgentListComponent } from './dashboard/agent-list/agent-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { UserResolver } from './users/user.resolver';


@NgModule({
  declarations: [DashboardComponent, ProjectListComponent, ProjectsComponent, AgentListComponent, EditUserComponent, ShowUserComponent],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    UserResolver
  ]
})
export class BackofficeModule { }
