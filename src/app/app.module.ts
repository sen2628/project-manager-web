import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// project main component for single page rendering
import { AppComponent } from './app.component';


// app core components for business functionalities
import { AppProjectManagerHomeComponent } from './project-manager/app-project-manager-home/app-project-manager-home.component';
import { AppProjectManagerMaintainUserComponent } from './project-manager/app-project-manager-maintain-user/app-project-manager-maintain-user.component';
import { AppProjectManagerMaintainProjectTaskComponent } from './project-manager/app-project-manager-maintain-project-task/app-project-manager-maintain-project-task.component';
import { AppProjectManagerMaintainProjectComponent } from './project-manager/app-project-manager-maintain-project/app-project-manager-maintain-project.component'

// routing module for navigation
import { AppRoutingModule } from './shared/app-router/app-routing.module';

//material imports for styling
import { AppMaterialImportModule } from './shared/app-material/app-material.module';
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
    AppRoutingModule,
    AppMaterialImportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
