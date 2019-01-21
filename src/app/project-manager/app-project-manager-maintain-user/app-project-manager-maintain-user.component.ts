import { Component, OnInit, Input } from '@angular/core';
import { ViewUsers } from '../project-manager-models/project_manager_user.model';

const tempResults: ViewUsers[] = [
  { "userId": 1, "firstName": "Senthilkumar", "lastName": "Rajendran", "employeeId": 10001 },
  { "userId": 2, "firstName": "DineshKumar", "lastName": "Viswasam", "employeeId": 10002 },
  { "userId": 3, "firstName": "Abirami", "lastName": "Rajendran", "employeeId": 10003 }
]

@Component({
  selector: 'app-app-project-manager-maintain-user',
  templateUrl: './app-project-manager-maintain-user.component.html',
  styleUrls: ['./app-project-manager-maintain-user.component.scss']
})
export class AppProjectManagerMaintainUserComponent implements OnInit {

  componentTitle: string = 'Maintain User';
  addUpdateButton: string = "Add User";
  newUpdateFirstName: string = null;
  newUpdateLastName: string = null;
  newUpdateEmployeeId: number = null;

  resultUsersList: ViewUsers[] = [];


  sortByColumn: string = null;
  sortAscDscFlag: boolean;


  constructor() { }

  ngOnInit() {

    this.resultUsersList = tempResults;

  }


  sortProjectListView(sortByString: string) {

    this.sortByColumn = sortByString;

    if (this.sortAscDscFlag) {
      this.sortAscDscFlag = false;
    } else {
      this.sortAscDscFlag = true;
    }

  }

}
