import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project main component for single page rendering
import { AppComponent } from './app.component';

// hammer JS imports
import 'hammerjs';


// app core components import module for business functionalities
import { AppProjectManagerComponentImportModule } from './project-manager/app-project-manager-components-imports.modules';

// routing module for navigation
import { AppRoutingModule } from './shared/app-router/app-routing.module';

//material imports for styling
import { AppMaterialImportModule } from './shared/app-material/app-material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialImportModule,
    AppProjectManagerComponentImportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
