import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";

// project main component for single page rendering
import { AppComponent } from './app.component';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// hammer JS imports
import 'hammerjs';


// app core components import module for business functionalities
import { AppProjectManagerComponentImportModule } from './project-manager/app-project-manager-components-imports.modules';

// routing module for navigation
import { AppRoutingModule } from './shared/app-router/app-routing.module';

//material imports for styling
import { AppMaterialImportModule } from './shared/app-material/app-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { APP_BASE_HREF } from "@angular/common";

import { AppHttpResponseHandler } from './shared/app-http/app-http-response-handler.service';
import { AppHttpService } from './shared/app-http/app-http.service';
import { HttpModule } from '@angular/http';
import { AppHttpServiceModule } from './shared/app-http/app-httpService.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModule, // ng-bootstrap module
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppHttpServiceModule,
    AppMaterialImportModule,
    AppProjectManagerComponentImportModule,
    LayoutModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: "."
    },
    AppHttpResponseHandler,
    AppHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
