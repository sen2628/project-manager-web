import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
// services core import
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

import { AppHttpService } from './app-http.service';
import { AppHttpResponseHandler } from './app-http-response-handler.service';
import { Observable } from 'rxjs';

@NgModule({
  imports: [CommonModule, HttpModule],
  exports: [Observable]
})
export class AppHttpServiceModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppHttpServiceModule,
      providers: [AppHttpService, AppHttpResponseHandler]
    };
  }
}
