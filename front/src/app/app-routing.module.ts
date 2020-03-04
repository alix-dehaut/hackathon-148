import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthGuard } from './authentication/auth.guard';
import { AnonymousGuard } from './authentication/anonymous.guard';


const routes: Routes = [
  {
    path: 'connexion',
    component: LoginComponent,
    canActivate: [AnonymousGuard]
  },
  {
    path: 'inscription',
    component: RegisterComponent
  },
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path:'',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
