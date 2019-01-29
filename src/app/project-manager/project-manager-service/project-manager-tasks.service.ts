import { Injectable } from '@angular/core';
import { AppHttpService } from '../../shared/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';


/*
 * Service method which is invoked from search cover sheet component
 * and invokes Async Service with required params
 */
@Injectable()
export class ProjectService {

  private baseUrl = 'http://localhost:8080/task';

  constructor(
    private projectUserHttpService: AppHttpService,
    private projectModalService: ProjectManagerDisplayComponent
  ) { }

  getAllParentTasks(): Observable<any> {
    return this.projectUserHttpService
      .get(`${this.baseUrl}/parentTasks`)
      .map((data) => {
        return data;
      })
      .catch((err) => {
        this.projectModalService.modelOpen('Service Error', 'Unable to Retrieve Parent Task Details. Please try again, If issues exists contact support team', '', [], true, '', false, false);
        return Observable.throw(err);
      });
  }

  addParentTaskToDatabase(data: any): Observable<any> {
    return this.projectUserHttpService.post(`${this.baseUrl}/addParentTask`, data).map((data) => {
      return data;
    });
  }



}
