import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppProjectManagerHomeComponent } from './project-manager/app-project-manager-home/app-project-manager-home.component';
import { AppProjectManagerMaintainUserComponent } from './project-manager/app-project-manager-maintain-user/app-project-manager-maintain-user.component';
import { AppProjectManagerMaintainProjectTaskComponent } from './project-manager/app-project-manager-maintain-project-task/app-project-manager-maintain-project-task.component';
import { AppProjectManagerMaintainProjectComponent } from './project-manager/app-project-manager-maintain-project/app-project-manager-maintain-project.component'

@NgModule({
  declarations: [
    AppComponent,
    AppProjectManagerHomeComponent,
    AppProjectManagerMaintainProjectComponent,
    AppProjectManagerMaintainUserComponent,
    AppProjectManagerMaintainProjectTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
