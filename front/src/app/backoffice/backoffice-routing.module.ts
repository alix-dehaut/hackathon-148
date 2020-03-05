import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { UserResolver } from './users/user.resolver';
import { ShowProjectComponent } from './projects/show-project/show-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectResolver } from './projects/project.resolver';
import { ProjectsResolver } from './projects/projects.resolver';
import { AddProjectComponent } from './projects/add-project/add-project.component';


const routes: Routes = [
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'show-user/:id',
    component: ShowUserComponent,
    resolve: {
      user: UserResolver,
      projects: ProjectsResolver
    }
  },
  {
    path: 'edit-project/:id',
    component: EditProjectComponent,
    resolve: {
      project: ProjectResolver
    }
  },
  {
    path: 'show-project/:id',
    component: ShowProjectComponent,
    resolve: {
      project: ProjectResolver
    }
  },
  {
    path: 'add-project',
    component: AddProjectComponent
  },
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UserResolver,
    ProjectResolver,
    ProjectsResolver
  ]
})
export class BackofficeRoutingModule { }
