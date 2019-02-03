import { Component, OnInit } from '@angular/core';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model'
import { Sort } from '@angular/material';
import { ProjectService } from '../project-manager-service/project-manager-project.service';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';
import { ProjectUserService } from '../project-manager-service/project-manager-user.service';
import { ViewUsers } from '../project-manager-models/project_manager_user.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddProjectTasks } from '../project-manager-models/project_manager_add_project_tasks.model';
import { DataSharedService } from '../project-manager-service/project-manager-data-exchange.service';
import { ViewTasks } from '../project-manager-models/project_manager_view_tasks.model';
import { TaskService } from '../project-manager-service/project-manager-tasks.service';

/* const tempProjectResult: ViewProjectTasks[] = [
  { "projectId": 1000, "projectName": "FSD Program", "projectStartDate": "01-01-2019", "projectEndDate": "01-31-2019", "priority": 0, "status": "Completed", "userId": 100, "completeTasks": 3, "totalTasks": 3 },
  { "projectId": 1001, "projectName": "Logistics Program", "projectStartDate": "01-01-2019", "projectEndDate": "01-31-2019", "priority": 0, "status": "Completed", "userId": 100, "completeTasks": 3, "totalTasks": 5 },
  { "projectId": 1002, "projectName": "Machine Learning Program", "projectStartDate": "01-01-2019", "projectEndDate": "01-31-2019", "priority": 0, "status": "Completed", "userId": 100, "completeTasks": 5, "totalTasks": 9 }
] */

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-app-project-manager-maintain-project',
  templateUrl: './app-project-manager-maintain-project.component.html',
  styleUrls: ['./app-project-manager-maintain-project.component.scss']
})
export class AppProjectManagerMaintainProjectComponent implements OnInit {

  projectStepperValue: number = 0;
  sortByColumn: string = null;
  sortAscDscFlag: boolean;
  resultProjectList: ViewProjectTasks[] = [];
  filterResultProjectList: ViewProjectTasks[] = [];
  resultProjectListSortedData: ViewProjectTasks[] = [];
  currentDate = new Date();
  newProjectStartDate = new Date();
  newProjectEndDate = new Date();
  setDefaultDate: boolean = false;
  userSelectionList: ViewUsers[] = [];
  filteredUserSelectionList: ViewUsers[] = [];
  newUserDetails: ViewUsers;
  newManagerName: string;
  newProjectName: string;
  addUpdateButton: string = "Add Project";
  isEditFlag: boolean;
  isSuspendFlag: boolean;
  newProjectDetails: AddProjectTasks;
  isProjectStartDateEdit: boolean;
  updateProjectDetails: ViewProjectTasks;
  updateTasks: ViewTasks[] = [];
  filteredUpdatedTasks: ViewTasks[] = [];
  isSuspendUpdateFlag: boolean;
  isExcludeProjectDetails: boolean;


  dynamicGrid: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 3, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 3, color: 'lightgreen' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
  ];

  private _searchUserTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchUserTerm(): string {
    return this._searchUserTerm;
  }

  // This setter is called every time the value in the search text box changes
  set searchUserTerm(value: string) {
    this._searchUserTerm = value;
    this.filteredUserSelectionList = this.filterUsers(value);
  }


  filterUsers(searchString: string) {
    //  console.log(searchString);
    return this.userSelectionList.filter(prjUser =>
      (prjUser.firstName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) ||
      (prjUser.lastName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1));
  }


  private _searchTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called every time the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.resultProjectListSortedData = this.filterProjects(value);
  }


  filterProjects(searchString: string) {
    //  console.log(searchString);
    return this.resultProjectList.filter(projectResult =>
      projectResult.projectName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }


  constructor(private prjApiService: ProjectService,
    private prjModalService: ProjectManagerDisplayComponent,
    private selectionModalService: NgbModal,
    private prjUserService: ProjectUserService,
    private prjTaskService: TaskService,
    private prjDataSharedService: DataSharedService) {
    this.projectStepperValue = 0;
    this.setNewProjectDates();
    this.getAllProjectDetailsFromDatabase();
    this.getUserFromDatabase();
  }

  ngOnInit() {

  }

  setNewProjectDates() {
    this.setDefaultDate = true;
    this.newProjectStartDate = new Date();
    this.newProjectEndDate = new Date();
    this.newProjectEndDate.setDate(this.newProjectEndDate.getDate() + 1);
    this.newProjectStartDate.setDate(this.newProjectStartDate.getDate());
  }

  setProjectDefaultDate() {
    if (this.setDefaultDate) {
      this.setDefaultDate = false;
    } else {
      this.setDefaultDate = true;
      this.setNewProjectDates();
    }
  }

  getUsersForManagersSelection(content) {

    if (this.userSelectionList !== null && this.userSelectionList !== undefined && this.userSelectionList.length !== 0) {

      this.selectionModalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    } else {
      this.prjModalService.modelOpen('Error', 'No Available Users to Make Selection', '', [], true, '', false, false);
    }

  }


  getAllProjectDetailsFromDatabase() {

    this.prjApiService.getAllProjects().subscribe((data: any) => {

      this.resultProjectList = data;
      //  this.updateResultColumn();
      this.prepareDataForSort();
      this.filterExcludeProjectDetails();

    })

  }

  getUserFromDatabase() {
    this.prjUserService.getAllUsers().subscribe((data) => {
      this.userSelectionList = data;
      this.filteredUserSelectionList = this.userSelectionList;
    });
  }

  userModelRowClick(userDetails: ViewUsers) {

    this.newUserDetails = userDetails;
    this.newManagerName = this.newUserDetails.firstName + ' ' + this.newUserDetails.lastName;

  }

  filterExcludeProjectDetails() {

    if (!this.isExcludeProjectDetails) {

      this.isExcludeProjectDetails = true;
      this.resultProjectListSortedData = this.resultProjectListSortedData.filter(res => res.status !== "Suspended");

    } else {
      this.isExcludeProjectDetails = false;

      this.prepareDataForSort();


    }


  }


  /*   updateResultColumn() {
  
      if (this.resultProjectList !== null && this.resultProjectList !== undefined) {
  
        this.resultProjectList.forEach(prjList => {
          if (prjList.totalTasks === prjList.completeTasks && prjList.completeTasks !== 0) {
            prjList.status = 'Completed';
          } else if (prjList.projectStartDate === prjList.projectEndDate) {
            prjList.status = 'Suspended';
          }
        })
      }
  
    } */

  prepareDataForSort() {
    this.resultProjectListSortedData = this.resultProjectList.slice();

  }
  updateAddProjectToDatabase() {

    if (this.newProjectName !== null && this.newProjectName !== undefined && this.newProjectName.trim().length > 0) {

      if (this.newProjectEndDate > this.newProjectEndDate) {

        this.prjModalService.modelOpen('Validation Error', 'Project End date should be greater than Project Start Date', '', [], true, '', false, false);
      } else {

        if (this.newManagerName !== null && this.newManagerName !== undefined && this.newManagerName.trim().length > 0) {

          if (!this.isEditFlag) {
            const newProjectAddDetails = new AddProjectTasks();
            newProjectAddDetails.projectName = this.newProjectName.toUpperCase();
            newProjectAddDetails.projectStartDate = this.newProjectStartDate;
            newProjectAddDetails.projectEndDate = this.newProjectEndDate;
            newProjectAddDetails.priority = this.projectStepperValue;
            newProjectAddDetails.userId = this.newUserDetails.userId;

            this.prjModalService.modelOpen('Confirmation', 'Are you sure want to add this Project?', '', [], true, '', false, true);

            this.prjDataSharedService.isConfirmationValueMessage.subscribe(isValue => {

              if (isValue) {

                this.prjApiService.addProjectToDatabase(newProjectAddDetails).subscribe((data) => {
                  this.prjModalService.modelOpen('Success', 'New Project has been added to database.', '', [], true, '', false, false);
                  this.getAllProjectDetailsFromDatabase();
                  this.resetAddProjectDetails();
                });

              }

            })

          } else {

            const modifyProjectDetails = new ViewProjectTasks();
            modifyProjectDetails.projectId = this.updateProjectDetails.projectId;
            modifyProjectDetails.projectName = this.newProjectName;
            modifyProjectDetails.projectStartDate = this.updateProjectDetails.projectStartDate;
            modifyProjectDetails.projectEndDate = this.newProjectEndDate;
            modifyProjectDetails.priority = this.projectStepperValue;
            if (this.newUserDetails.userId !== null && this.newUserDetails.userId !== undefined) {
              modifyProjectDetails.userId = this.newUserDetails.userId;
            } else {
              modifyProjectDetails.userId = this.updateProjectDetails.userId;
            }

            modifyProjectDetails.totalTasks = this.updateProjectDetails.totalTasks;
            modifyProjectDetails.completeTasks = this.updateProjectDetails.completeTasks;

            this.prjModalService.modelOpen('Confirmation', 'Are you sure want to update this Project?', '', [], true, '', false, true);

            this.prjDataSharedService.isConfirmationValueMessage.subscribe(isValue => {
              if (isValue) {

                this.prjApiService.updateProjectToDatabase(modifyProjectDetails.projectId, modifyProjectDetails).subscribe((data) => {
                  this.prjModalService.modelOpen('Success', 'Project Updated.', '', [], true, '', false, false);
                  this.resetAddProjectDetails();
                  this.getAllProjectDetailsFromDatabase();
                })

              }
            })
          }


        } else {
          this.prjModalService.modelOpen('Validation Error', 'Please Select Manager to Add Project', '', [], true, '', false, false);

        }
      }


    } else {
      this.prjModalService.modelOpen('Validation Error', 'Please enter project details to add new Project.', '', [], true, '', false, false);
    }

  }

  suspendProjectToDatabase(resultProjects: ViewProjectTasks) {

    this.isSuspendUpdateFlag = false;
    this.updateProjectDetails = resultProjects;
    const modifyProjectDetails = new ViewProjectTasks();
    modifyProjectDetails.projectId = this.updateProjectDetails.projectId;
    modifyProjectDetails.projectName = this.updateProjectDetails.projectName;
    modifyProjectDetails.projectStartDate = this.updateProjectDetails.projectStartDate;
    modifyProjectDetails.projectEndDate = this.updateProjectDetails.projectEndDate;
    modifyProjectDetails.priority = this.updateProjectDetails.priority;

    if (this.updateProjectDetails.userId === undefined) {
      modifyProjectDetails.userId = 0;
    } else {
      modifyProjectDetails.userId = this.updateProjectDetails.userId;

    }
    if (this.updateProjectDetails.totalTasks === undefined) {

      modifyProjectDetails.totalTasks = 0;
    } else {
      modifyProjectDetails.totalTasks = this.updateProjectDetails.totalTasks;

    }

    if (this.updateProjectDetails.completeTasks === undefined) {

      modifyProjectDetails.completeTasks = 0;

    } else {

      modifyProjectDetails.completeTasks = this.updateProjectDetails.completeTasks;

    }


    this.prjModalService.modelOpen('Confirmation', 'Are you sure want to suspend this Project?', '', [], true, '', false, true);

    this.delay(3000).then(any => {
      this.prjDataSharedService.isConfirmationValueMessage.subscribe((isValue) => {

        if (isValue) {

          if (modifyProjectDetails.projectId !== null) {
            this.methodToUpdateSuspendStatus(modifyProjectDetails.projectId);
          }

        }

      });
    });




  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => { });
  }

  methodToUpdateSuspendStatus(projectIdToSuspend: number) {

    this.prjTaskService.getAllTasks().subscribe((data) => {
      this.updateTasks = data;

      if (this.updateTasks.length > 0 && this.updateTasks !== undefined) {


        this.filteredUpdatedTasks = this.updateTasks.filter(task => task.projectId === projectIdToSuspend);

        if (this.filteredUpdatedTasks !== undefined && this.filteredUpdatedTasks.length > 0 && this.filteredUpdatedTasks !== null) {

          this.filteredUpdatedTasks.forEach(taskDet => {
            taskDet.taskStatus = 'Suspended';
            taskDet.taskStatusId = 4;
            this.prjTaskService.updateTaskToDatabase(taskDet).subscribe((data) => {
              this.isSuspendUpdateFlag = true;
            })
          })
        } else {

          this.isSuspendUpdateFlag = false;
          this.prjModalService.modelOpen('Message', 'No Tasks associated with this project to suspend the Project.', '', [], true, '', false, false);
          this.resetAddProjectDetails();
          this.getAllProjectDetailsFromDatabase();
        }

        if (this.isSuspendUpdateFlag) {

          this.prjModalService.modelOpen('Suspended', 'Project Suspended.', '', [], true, '', false, false);
          this.resetAddProjectDetails();
          this.getAllProjectDetailsFromDatabase();
        }
      }


    })
  }



  setProjectDetailsForUpdate(resultPrj: ViewProjectTasks) {
    this.updateProjectDetails = resultPrj;
    this.addUpdateButton = "Update Project";
    this.setDefaultDate = false;
    this.isProjectStartDateEdit = true;
    this.newProjectName = resultPrj.projectName;
    this.userSelectionList.forEach(usrDet => {
      if (usrDet.userId === resultPrj.userId) {
        this.newManagerName = usrDet.firstName + ' ' + usrDet.lastName;
      }
    });
    this.newProjectStartDate = resultPrj.projectStartDate;
    this.newProjectEndDate = resultPrj.projectEndDate;
    this.projectStepperValue = resultPrj.priority;
    this.isEditFlag = true;
  }


  resetAddProjectDetails() {

    this.newManagerName = null;
    this.setNewProjectDates();
    this.newProjectName = null;
    this.projectStepperValue = 0;
    this.getAllProjectDetailsFromDatabase();
    this.addUpdateButton = "Add Task";
    this.isEditFlag = false;
    this.isSuspendFlag = false;
    this.setDefaultDate = true;
    this.isProjectStartDateEdit = false;


  }

  sortProjectListView(sortByString: string) {
    this.sortByColumn = sortByString;
  }

  sortData(sort: Sort) {
    const data = this.resultProjectList.slice();
    if (!sort.active || sort.direction === '') {
      this.resultProjectListSortedData = data;
      return;
    }

    this.resultProjectListSortedData =
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'projectStartDate': return compare(a.projectStartDate.toDateString(), b.projectStartDate.toDateString(), isAsc);
          case 'projectEndDate': return compare(a.projectEndDate.toDateString(), b.projectEndDate.toDateString(), isAsc);
          case 'priority': return compare(a.priority, b.priority, isAsc);
          case 'status': return compare(a.status, b.status, isAsc);
          default: return 0;
        }
      });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

