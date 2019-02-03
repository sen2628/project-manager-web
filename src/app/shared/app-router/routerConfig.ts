import { Routes } from '@angular/router';

import { AppProjectManagerHomeComponent } from '../../project-manager/app-project-manager-home/app-project-manager-home.component';
import { AppProjectManagerViewProjectTaskComponent } from '../../project-manager/app-project-manager-view-project-task/app-project-manager-view-project-task.component';
import { AppProjectManagerMaintainProjectComponent } from '../../project-manager/app-project-manager-maintain-project/app-project-manager-maintain-project.component';
import { AppProjectManagerMaintainProjectTaskComponent } from '../../project-manager/app-project-manager-maintain-project-task/app-project-manager-maintain-project-task.component';
import { AppProjectManagerMaintainUserComponent } from '../../project-manager/app-project-manager-maintain-user/app-project-manager-maintain-user.component';

export const appRoutes: Routes = [

  {
    path: 'prjViewTask',
    component: AppProjectManagerViewProjectTaskComponent,
  },
  {
    path: 'prjAddTask',
    component: AppProjectManagerMaintainProjectTaskComponent,
  },
  {
    path: 'prjAddProject',
    component: AppProjectManagerMaintainProjectComponent,
  },
  {
    path: 'prjAddUser',
    component: AppProjectManagerMaintainUserComponent,
  },
  {
    path: 'prjEditTask',
    component: AppProjectManagerMaintainProjectTaskComponent,
  }
];
