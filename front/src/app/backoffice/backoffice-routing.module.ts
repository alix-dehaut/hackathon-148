import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { UserResolver } from './users/user.resolver';


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
      user: UserResolver
    }
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
    UserResolver
  ]
})
export class BackofficeRoutingModule { }
