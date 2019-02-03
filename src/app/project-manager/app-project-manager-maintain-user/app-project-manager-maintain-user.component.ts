import { Component, OnInit, Input } from '@angular/core';
import { ViewUsers } from '../project-manager-models/project_manager_user.model';
import { Sort } from '@angular/material';
import { ProjectUserService } from '../project-manager-service/project-manager-user.service';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';
import { AddUser } from '../project-manager-models/project_manager_add_user.model';
import { DataSharedService } from '../project-manager-service/project-manager-data-exchange.service';


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

  addUpdateButton: string = "Add User";
  newUpdateFirstName: string = null;
  newUpdateLastName: string = null;
  newUpdateEmployeeId: number = null;
  isEditFlag: boolean;
  isEditUserId: number;

  resultUsersList: ViewUsers[] = [];
  resultUsersListSortedData: ViewUsers[] = [];


  sortByColumn: string = null;

  private _searchTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called every time the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.resultUsersListSortedData = this.filterUsers(value);
  }


  filterUsers(searchString: string) {
    //   console.log(searchString);
    return this.resultUsersList.filter(userResult =>
      (userResult.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) ||
      (userResult.lastName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1));
  }

  constructor(private prjUserService: ProjectUserService,
    private prjModalService: ProjectManagerDisplayComponent,
    private prjSharedService: DataSharedService) {
    this.getUserListData();
  }

  ngOnInit() {
  }

  getUserListData() {

    this.prjUserService.getAllUsers().subscribe((data: any) => {
      this.resultUsersList = data;
      //    console.log(JSON.stringify(this.resultUsersList));
      this.prepareDataForSort();
    });
  }

  prepareDataForSort() {

    this.resultUsersListSortedData = this.resultUsersList.slice();


  }

  deleteProjectUserFromDatabase(deleteUserId: number) {

    this.prjModalService.modelOpen('Confirmation', 'Are you sure want to delete this User?', '', [], true, '', false, true);

    this.prjSharedService.isConfirmationValueMessage.subscribe((isValue) => {
      if (isValue) {

        this.prjUserService.deleteUserFromDatabase(deleteUserId).subscribe((data: any) => {
          this.prjModalService.modelOpen('Deleted', 'Selected user has been deleted', '', [], true, '', false, false);
          this.getUserListData();
        })

      }
    })

  }

  addUpdateUser() {

    if (this.isEditFlag) { // edit user details

      let userDetail = new ViewUsers();
      userDetail.userId = this.isEditUserId
      userDetail.firstName = this.newUpdateFirstName;
      userDetail.lastName = this.newUpdateLastName;
      userDetail.employeeId = this.newUpdateEmployeeId;
      this.prjModalService.modelOpen('Confirmation', 'Are you sure want to update this User?', '', [], true, '', false, true);

      this.prjSharedService.isConfirmationValueMessage.subscribe((isValue) => {

        if (isValue) {
          this.prjUserService.updateUserToDatabase(this.isEditUserId, userDetail).subscribe((data: any) => {
            this.prjModalService.modelOpen('Updated', 'User has been updated', '', [], true, '', false, false);
            this.addUpdateButton = "Add User";
            this.resetUserDetails();
            this.getUserListData();
          })

        }
      })


    } else { // add user details.

      if ((this.newUpdateFirstName !== null) && (this.newUpdateFirstName.trim().length !== 0) &&
        (this.newUpdateLastName !== null) && (this.newUpdateLastName.trim().length !== 0) &&
        (this.newUpdateEmployeeId !== null) && (this.newUpdateEmployeeId.toString().trim().length !== 0)) {

        if (this.resultUsersList.find(usrAdd => usrAdd.employeeId === this.newUpdateEmployeeId)) {

          this.prjModalService.modelOpen('Validation', 'Employee Id Already Exists in the system', '', [], true, '', false, false);

        } else {

          let addUserDetail = new AddUser();
          addUserDetail.firstName = this.newUpdateFirstName;
          addUserDetail.lastName = this.newUpdateLastName;
          addUserDetail.employeeId = this.newUpdateEmployeeId;

          this.prjModalService.modelOpen('Confirmation', 'Are you sure want to Add this new User?', '', [], true, '', false, true);

          this.prjSharedService.isConfirmationValueMessage.subscribe((isValue) => {
            if (isValue) {

              this.prjUserService.addUserToDatabase(addUserDetail).subscribe((data: any) => {
                this.prjModalService.modelOpen('Added', 'New User Saved to System', '', [], true, '', false, false);
                this.resetUserDetails();
                this.getUserListData();
              })
            }
          })
        }

      } else {
        this.prjModalService.modelOpen('Validation', 'Please Enter Mandatory Fields to Add User', '', [], true, '', false, false);
      }

    }
  }

  setEditUserData(firstName: string, lastName: string, empId: number, userId: number) {

    this.isEditFlag = true;
    this.newUpdateFirstName = firstName;
    this.newUpdateLastName = lastName;
    this.newUpdateEmployeeId = empId;
    this.isEditUserId = userId;
    this.addUpdateButton = "Update User";
  }

  resetUserDetails() {

    this.isEditFlag = false;
    this.addUpdateButton = 'Add User';
    this.newUpdateEmployeeId = null;
    this.newUpdateLastName = null;
    this.newUpdateFirstName = null;
    this.isEditUserId = null;
    this._searchTerm = null;
    this.getUserListData();
    this.addUpdateButton = "Add User";

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
