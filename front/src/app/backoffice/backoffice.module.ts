import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './dashboard/project-list/project-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatSortModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { AgentListComponent } from './dashboard/agent-list/agent-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ShowUserComponent } from './users/show-user/show-user.component';
import { UserResolver } from './users/user.resolver';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ShowProjectComponent } from './projects/show-project/show-project.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';

export function minlengthValidationMessage(err, field) {
  return `La longeur minimum est de ${field.templateOptions.minLength} caractères`;
}

export function maxlengthValidationMessage(err, field) {
  return `La longeur maximum est de ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `La valeur doit être supérieure à ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `La valeur doit être inférieur à ${field.templateOptions.max}`;
}
@NgModule({
  declarations: [DashboardComponent, ProjectListComponent, AgentListComponent, EditUserComponent, ShowUserComponent, ShowProjectComponent, EditProjectComponent, AddProjectComponent],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    RouterModule,
    SharedModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'Ce champ est requis' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    }),
    FormlyMaterialModule
  ],
  providers: [
    UserResolver
  ]
})
export class BackofficeModule { }
