import { Injectable } from '@angular/core';
import { AppHttpService } from '../../shared/app-http/app-http.service';
import { Observable } from 'rxjs/Observable';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';


/*
 * Service method which is invoked from search cover sheet component
 * and invokes Async Service with required params
 */
@Injectable()
export class ProjectUserService {

  // private baseUrl = 'http://localhost:8080/user'; //local setup
  private baseUrl = 'http://localhost:8085/pmappservice/user'; //server deployment 

  constructor(
    private projectUserHttpService: AppHttpService,
    private projectModalService: ProjectManagerDisplayComponent
  ) { }

  getAllUsers(): Observable<any> {
    return this.projectUserHttpService
      .get(`${this.baseUrl}/`)
      .map((data) => {
        return data;
      })
      .catch((err) => {
        this.projectModalService.modelOpen('Service Error', 'Unable to Retrieve User Details. Please try again, If issues exists contact support team', '', [], true, '', false, false);
        return Observable.throw(err);
      });
  }

  addUserToDatabase(data: any): Observable<any> {
    return this.projectUserHttpService.post(`${this.baseUrl}/add/`, data).map((data) => {
      return data;
    });
  }

  deleteUserFromDatabase(deleteUserId: number): Observable<any> {
    //console.log(data);
    return this.projectUserHttpService.delete(`${this.baseUrl}/delete/` + deleteUserId).map((data) => {
      return data;
    });
  }

  updateUserToDatabase(updateUserId: number, data: any): Observable<any> {
    return this.projectUserHttpService.put(`${this.baseUrl}/update/` + updateUserId, data).map((data) => {
      return data;
    });
  }


}
