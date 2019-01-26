import { Component, OnInit, Input } from '@angular/core';
import { ViewUsers } from '../project-manager-models/project_manager_user.model';
import { Sort } from '@angular/material';


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
  resultUsersListSortedData: ViewUsers[] = [];


  sortByColumn: string = null;

  constructor() {

    this.setUserListData();
    this.resultUsersListSortedData = this.resultUsersList.slice();

  }

  ngOnInit() {

  }

  setUserListData() {
    this.resultUsersList = tempResults;
  }

  sortProjectListView(sortByString: string) {

    this.sortByColumn = sortByString;

  }

  sortData(sort: Sort) {
    const data = this.resultUsersList.slice();
    if (!sort.active || sort.direction === '') {
      this.resultUsersListSortedData = data;
      return;
    }

    this.resultUsersListSortedData =
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'firstName': return compare(a.firstName, b.firstName, isAsc);
          case 'lastName': return compare(a.lastName, b.lastName, isAsc);
          case 'employeeId': return compare(a.employeeId, b.employeeId, isAsc);
          default: return 0;
        }
      });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
