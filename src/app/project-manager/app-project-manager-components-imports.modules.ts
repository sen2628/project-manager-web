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
import { AppProjectManagerModalComponent, ProjectManagerDisplayComponent } from './app-project-manager-modal/app-project-manager-modal.component';
import { ProjectUserService } from './project-manager-service/project-manager-user.service';
import { ProjectService } from './project-manager-service/project-manager-project.service';
import { DataSharedService } from './project-manager-service/project-manager-data-exchange.service';
import { TaskService } from './project-manager-service/project-manager-tasks.service';


@NgModule({
  declarations: [AppProjectManagerHomeComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent,
    AppProjectManagerViewProjectTaskComponent,
    AppProjectManagerMaintainProjectComponent,
    AppProjectManagerModalComponent, ProjectManagerDisplayComponent],
  imports: [CommonModule, AppMaterialImportModule, AppRoutingModule, FormsModule],
  providers: [ProjectService, ProjectUserService, TaskService, ProjectManagerDisplayComponent, DataSharedService],
  entryComponents: [AppProjectManagerModalComponent],
  exports: [AppProjectManagerHomeComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent,
    AppProjectManagerViewProjectTaskComponent,
    AppProjectManagerMaintainProjectComponent,
    AppProjectManagerModalComponent,
    ProjectManagerDisplayComponent
  ]
})

export class AppProjectManagerComponentImportModule { }

