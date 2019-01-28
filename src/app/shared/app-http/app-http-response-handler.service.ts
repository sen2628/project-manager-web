import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


/**
 * Monthly Forecasting Global Http Response handler to catch any http error codes
 * and render appropriate error messages.
 */
@Injectable()
export class AppHttpResponseHandler {
  constructor(private router: Router) {
  }
  /**
   * Global http success handler
   * @param response
   * @param timestamp
   * @returns response
   * */
  public onSuccess(response: any): Observable<any> {

    // this.hideError(response);
    // this.hideLoader();
    return response.text() ? response.json() : {};;
  }

  public downloadonSuccess(response: any) {

    // this.hideError(response);
    // this.hideLoader();
    return response;
  }
  /**
   * Global http error handler.
   *
   * @param error
   * @param source
   * @returns {ErrorObservable}
   */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    switch (response.status) {

    }

    return Observable.throw(response);
  }

}
