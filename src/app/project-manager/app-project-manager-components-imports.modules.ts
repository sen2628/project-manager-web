import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// app components module import
import { AppProjectManagerHomeComponent } from './app-project-manager-home/app-project-manager-home.component';
import { AppProjectManagerMaintainUserComponent } from './app-project-manager-maintain-user/app-project-manager-maintain-user.component';
import { AppProjectManagerMaintainProjectTaskComponent } from './app-project-manager-maintain-project-task/app-project-manager-maintain-project-task.component';
import { AppProjectManagerMaintainProjectComponent } from './app-project-manager-maintain-project/app-project-manager-maintain-project.component'


@NgModule({
  declarations: [AppProjectManagerHomeComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent,
    AppProjectManagerMaintainProjectComponent],
  imports: [CommonModule],
  exports: [AppProjectManagerHomeComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent,
    AppProjectManagerMaintainProjectComponent
  ]
})

export class AppProjectManagerComponentImportModule { }

