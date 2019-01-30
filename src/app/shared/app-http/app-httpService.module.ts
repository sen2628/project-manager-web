import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
// services core import
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

import { AppHttpResponseHandler } from './app-http-response-handler.service';
import { AppHttpService } from './app-http.service';

import { Observable } from 'rxjs';

@NgModule({
  imports: [CommonModule, HttpModule, HttpClientModule]
  //exports: [Observable]
})
export class AppHttpServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppHttpServiceModule,
      providers: [AppHttpResponseHandler,
        AppHttpService]
    };
  }
}
