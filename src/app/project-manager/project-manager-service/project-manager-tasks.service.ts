import { Injectable } from '@angular/core';
import { AppHttpService } from '../../shared/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';


/*
 * Service method which is invoked from search cover sheet component
 * and invokes Async Service with required params
 */
@Injectable()
export class TaskService {

  //private baseUrl = 'http://localhost:8080/task'; //local setup
  private baseUrl = 'http://localhost:8085/pmappservice/task'; //server deployment

  constructor(
    private projectUserHttpService: AppHttpService,
    private projectModalService: ProjectManagerDisplayComponent
  ) { }


  getAllTasks(): Observable<any> {
    return this.projectUserHttpService
      .get(`${this.baseUrl}/getAllTasks`)
      .map((data) => {
        return data;
      })
      .catch((err) => {
        this.projectModalService.modelOpen('Service Error', 'Unable to Retrieve Task Details. Please try again, If issues exists contact support team', '', [], true, '', false, false);
        return Observable.throw(err);
      });
  }

  updateTaskToDatabase(data: any): Observable<any> {
    return this.projectUserHttpService.post(`${this.baseUrl}/updateTask`, data).map((data) => {
      return data;
    });
  }

  addTaskToDatabase(data: any): Observable<any> {
    return this.projectUserHttpService.post(`${this.baseUrl}/addNewTask`, data).map((data) => {
      return data;
    });
  }

  addParentTaskToDatabase(data: any): Observable<any> {
    return this.projectUserHttpService.post(`${this.baseUrl}/addParentTask`, data).map((data) => {
      return data;
    });
  }

  getAllParentTasks(): Observable<any> {
    return this.projectUserHttpService
      .get(`${this.baseUrl}/getAllParentTasks`)
      .map((data) => {
        return data;
      })
      .catch((err) => {
        this.projectModalService.modelOpen('Service Error', 'Unable to Retrieve Parent Task Details. Please try again, If issues exists contact support team', '', [], true, '', false, false);
        return Observable.throw(err);
      });
  }


}
