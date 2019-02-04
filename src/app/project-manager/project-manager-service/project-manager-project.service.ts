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

  // private baseUrl = 'http://localhost:8080/project'; //local service
  private baseUrl = 'http://localhost:8085/pmappservice/project'; //server deployment

  constructor(
    private projectUserHttpService: AppHttpService,
    private projectModalService: ProjectManagerDisplayComponent
  ) { }

  getAllProjects(): Observable<any> {
    return this.projectUserHttpService
      .get(`${this.baseUrl}/getAllProjects`)
      .map((data) => {
        return data;
      })
      .catch((err) => {
        this.projectModalService.modelOpen('Service Error', 'Unable to Retrieve Project Details. Please try again, If issues exists contact support team', '', [], true, '', false, false);
        return Observable.throw(err);
      });
  }

  addProjectToDatabase(data: any): Observable<any> {
    return this.projectUserHttpService.post(`${this.baseUrl}/add/`, data).map((data) => {
      return data;
    });
  }

  deleteProjectFromDatabase(deleteProjectId: number): Observable<any> {
    //console.log(data);
    return this.projectUserHttpService.delete(`${this.baseUrl}/delete/` + deleteProjectId).map((data) => {
      return data;
    });
  }

  updateProjectToDatabase(updateProjectId: number, data: any): Observable<any> {
    return this.projectUserHttpService.put(`${this.baseUrl}/update/` + updateProjectId, data).map((data) => {
      return data;
    });
  }


}
