import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppHttpResponseHandler } from './app-http-response-handler.service';


/**
 * Monthly Forecasting Http service to wrap around REST Calls.
 */
@Injectable()
export class AppHttpService {
  private baseUrl = '';
  constructor(private http: Http, private responseHandler: AppHttpResponseHandler) {
    this.baseUrl = '';
  }

  /**
   * Set  HTTP Headers
   */
  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new Headers(headersConfig);
  }
  /**
   * Set  HTTP file Headers
   */
  private setFileHeaders(): Headers {
    /*  const headersConfig = {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
    };*/

    return new Headers();
  }
  /**
   * Format errors - later have Monthly Forecasting ExceptionHandler and
   * Monthly Forecasting Logger to handle exceptions and error messages.
   * @param error
   */
  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }
  /**
   * GET method requests a resource from the server along with query parameters if required
   * @param path
   * @param params
*/

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    // console.log('Before request time----:' + this.getCurrentDate());
    const timeStart: number = performance.now();
    return this.http
      .get(`${this.baseUrl}${path}`, {
        headers: this.setHeaders(),
        search: params
      })
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.onSuccess(res));
  }

  /**
   * Utility method for Update.
   * @param path
   * @param params
   */
  put(path: string, body: Object = {}): Observable<any> {

    return this.http
      .put(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.onSuccess(res));
  }

  /**
   * Utility method for Create.
   * @param path
   * @param params
   */
  post(path: string, body: Object = {}): Observable<any> {

    return this.http
      .post(`${this.baseUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders()
      })
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.onSuccess(res));
  }

  /**
   * Utility method for Delete.
   * @param path
   * @param params
   */
  delete(path: string, body: Object = {}): Observable<any> {

    return this.http
      .delete(`${this.baseUrl}${path}`, {
        headers: this.setHeaders(),
        body: JSON.stringify(body)
      })
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.onSuccess(res));
  }
  /**
   * Utility method for File Upload.
   * @param path
   * @param params
   */
  uploadFile(path: string, body: Object = {}): Observable<any> {

    return this.http
      .post(`${this.baseUrl}${path}`, body, {
        headers: this.setFileHeaders()
      })
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.onSuccess(res));
  }
  /**
   * Utility method for File Download.
   * @param path
   * @param params
   */
  downloadFile(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {

    const options = new RequestOptions({
      search: params,
      responseType: ResponseContentType.ArrayBuffer
    });
    return this.http
      .get(`${this.baseUrl}${path}`, options)
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.downloadonSuccess(res));
  }
  /**
   * Utility method for File Download With Post Method.
   * @param path
   * @param body
   */
  downloadFileByPost(path: string, body: Object = {}): Observable<any> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    const options = new RequestOptions({ headers: headers });
    // Ensure you set the responseType to Blob.
    options.responseType = ResponseContentType.Blob;
    return this.http
      .post(`${this.baseUrl}${path}`, JSON.stringify(body), options)
      .catch((err, source) => this.responseHandler.onCatch(err, source))
      .map((res: Response) => this.responseHandler.downloadonSuccess(res));
  }
}
