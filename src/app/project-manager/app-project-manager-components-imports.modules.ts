import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AppMaterialImportModule } from '../shared/app-material/app-material.module'
import { AppRoutingModule } from '../shared/app-router/app-routing.module';

// app components module import
import { AppProjectManagerHomeComponent } from './app-project-manager-home/app-project-manager-home.component';
import { AppProjectManagerMaintainUserComponent } from './app-project-manager-maintain-user/app-project-manager-maintain-user.component';
import { AppProjectManagerMaintainProjectTaskComponent } from './app-project-manager-maintain-project-task/app-project-manager-maintain-project-task.component';
import { AppProjectManagerMaintainProjectComponent } from './app-project-manager-maintain-project/app-project-manager-maintain-project.component';
import { AppProjectManagerViewProjectTaskComponent } from './app-project-manager-view-project-task/app-project-manager-view-project-task.component';


@NgModule({
  declarations: [AppProjectManagerHomeComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent,
    AppProjectManagerViewProjectTaskComponent,
    AppProjectManagerMaintainProjectComponent],
  imports: [CommonModule, AppMaterialImportModule, AppRoutingModule, FormsModule],
  exports: [AppProjectManagerHomeComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent,
    AppProjectManagerViewProjectTaskComponent,
    AppProjectManagerMaintainProjectComponent
  ]
})

export class AppProjectManagerComponentImportModule { }

