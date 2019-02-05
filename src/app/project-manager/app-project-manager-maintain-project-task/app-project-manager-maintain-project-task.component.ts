import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewUsers } from '../project-manager-models/project_manager_user.model';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model';
import { ViewParentTasks } from '../project-manager-models/project_manager_view_parent_task.model';
import { ProjectService } from '../project-manager-service/project-manager-project.service';
import { ProjectUserService } from '../project-manager-service/project-manager-user.service';
import { TaskService } from '../project-manager-service/project-manager-tasks.service';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';
import { DataSharedService } from '../project-manager-service/project-manager-data-exchange.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTasks } from '../project-manager-models/project_manager_add_tasks.model';
import { AddParentTasks } from '../project-manager-models/project_manager_add_parent_task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewTasks } from '../project-manager-models/project_manager_view_tasks.model';


@Component({
  selector: 'app-app-project-manager-maintain-project-task',
  templateUrl: './app-project-manager-maintain-project-task.component.html',
  styleUrls: ['./app-project-manager-maintain-project-task.component.scss']
})
export class AppProjectManagerMaintainProjectTaskComponent implements OnInit {

  projectStepperValue: number = 0;
  taskStartDate = new Date();
  taskEndDate = new Date();
  userSelectionList: ViewUsers[] = [];
  filteredUserSelectionList: ViewUsers[] = [];
  resultProjectList: ViewProjectTasks[] = [];
  filterResultProjectList: ViewProjectTasks[] = [];
  resultParentTaskList: ViewParentTasks[] = [];
  filterParentTaskList: ViewParentTasks[] = [];
  newUserDetails: ViewUsers;
  newManagerName: string;
  newManagerId: number;
  newProjectName: string;
  newProjectId: number;
  newProjectDetails: ViewProjectTasks;
  newParentTask: string;
  newParentId: number;
  newParentTaskDetails: ViewParentTasks;
  isParentTask: boolean;
  newTaskName: string;
  addUpdateButton: string = 'Add Task';
  isEditTask: boolean;
  dateFormat: string = 'YYYY-MM-DD';
  taskTitle: string = "Add Task";
  isEditFlag: boolean;
  editData: ViewTasks = null;
  isTaskStartDate: boolean;

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


  private _searchProjectTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchProjectTerm(): string {
    return this._searchProjectTerm;
  }

  // This setter is called every time the value in the search text box changes
  set searchProjectTerm(value: string) {
    this._searchProjectTerm = value;
    this.filterResultProjectList = this.filterProjects(value);
  }


  filterProjects(searchString: string) {
    //  console.log(searchString);
    return this.resultProjectList.filter(prj =>
      (prj.projectName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1));
  }


  private _searchParentTaskTerm: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchParentTaskTerm(): string {
    return this._searchParentTaskTerm;
  }

  // This setter is called every time the value in the search text box changes
  set searchParentTaskTerm(value: string) {
    this._searchParentTaskTerm = value;
    this.filterParentTaskList = this.filterParentTask(value);
  }


  filterParentTask(searchString: string) {
    //  console.log(searchString);
    return this.resultParentTaskList.filter(parentTask =>
      (parentTask.parentDesc.toLowerCase().indexOf(searchString.toLowerCase()) !== -1));
  }

  constructor(
    private activePathURL: ActivatedRoute,
    private prjProjectService: ProjectService,
    private prjUserService: ProjectUserService,
    private prjTaskService: TaskService,
    private selectionModalService: NgbModal,
    private prjModalService: ProjectManagerDisplayComponent,
    private prjDataSharedService: DataSharedService,
    private router: Router) {

    this.activePathURL.url.subscribe(activeURL => {

      if (window.location.pathname === '/prjAddTask') {
        this.isEditFlag = false;
      } else {
        this.isEditFlag = true;
      }

    });

    if (!this.isEditFlag) {
      this.taskTitle = "Add Task";
      this.addUpdateButton = 'Add Task';
      this.projectStepperValue = 0;
      this.isTaskStartDate = false;
      this.getAllRequiredDetailsForTasks();
    } else {
      this.taskTitle = "Edit Task";
      this.addUpdateButton = 'Update Task';
      this.isTaskStartDate = true;
      this.getAllRequiredDetailsForTasks();
      this.setDataForEditTask();
    }
  }

  ngOnInit() {


  }

  setDataForEditTask() {

    this.prjDataSharedService.isEditDataMessage.subscribe((data: any) => {

      this.editData = data;
      this.taskTitle = 'Edit Task';
      this.addUpdateButton = 'Update Task';

      this.newTaskName = this.editData.taskName;

      this.newManagerName = this.editData.userName;
      this.newParentTask = this.editData.parentDesc;
      this.newParentId = this.editData.parentId;

      this.newParentTask = this.editData.parentDesc;

      this.projectStepperValue = this.editData.priority;
      this.taskStartDate = new Date(this.editData.taskStartDate);
      this.taskEndDate = new Date(this.editData.taskEndDate);

      this.newProjectId = this.editData.projectId;
      this.newProjectName = this.editData.projectDesc;

      this.newManagerId = this.editData.taskUserId;

      this.isEditTask = true;
    })

  }

  getAllRequiredDetailsForTasks() {

    this.getAllProjects();
    this.getAllUsers();
    this.getAllParentTasks();
    this.setInitialDate();
  }

  setInitialDate() {

    this.taskStartDate = new Date();
    this.taskEndDate = new Date();
    this.taskEndDate.setDate(this.taskEndDate.getDate() + 1);
    this.taskStartDate.setDate(this.taskStartDate.getDate());

  }

  getAllProjects() {

    this.prjProjectService.getAllProjects().subscribe((data: any) => {
      this.resultProjectList = data;
      this.resultProjectList = this.resultProjectList.filter(prj => prj.status !== "Suspended");
      this.filterResultProjectList = this.resultProjectList;
    })

  }

  getAllUsers() {

    this.prjUserService.getAllUsers().subscribe((data: any) => {
      this.userSelectionList = data;
      this.filteredUserSelectionList = this.userSelectionList;
    })

  }

  getAllParentTasks() {

    this.prjTaskService.getAllParentTasks().subscribe((data: any) => {
      this.resultParentTaskList = data;
      this.filterParentTaskList = this.resultParentTaskList;
    })

  }

  userModelRowClick(userDetails: ViewUsers) {

    this.newUserDetails = userDetails;
    this.newManagerName = this.newUserDetails.firstName + ' ' + this.newUserDetails.lastName;

  }

  projectModelRowClick(projectDetails: ViewProjectTasks) {

    this.newProjectDetails = projectDetails;
    this.newProjectName = projectDetails.projectName;
  }

  parentTaskModelRowClick(parentTask: ViewParentTasks) {
    this.newParentTaskDetails = parentTask;
    this.newParentTask = parentTask.parentDesc;
  }


  projectSearch(content) {

    this.selectionModalService.open(content, { ariaLabelledBy: 'modal-basic-title' });


  }

  userSearch(content) {

    this.selectionModalService.open(content, { ariaLabelledBy: 'modal-basic-title' });


  }

  parentTaskSearch(content) {

    this.selectionModalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  enableDisableParentTask() {
    if (this.isParentTask) {
      this.isParentTask = false;
    } else {
      this.isParentTask = true;
    }
  }

  resetAddTaskData() {
    this.newManagerName = null;
    this.newParentTask = null;
    this.newProjectName = null;
    this.projectStepperValue = 0;
    this.newParentTaskDetails = null;
    this.newProjectDetails = null;
    this.newUserDetails = null;
    this.isParentTask = false;
    this.setInitialDate();
    this.isEditTask = false;
    this.addUpdateButton = 'Add Task';
    this.taskTitle = 'Add Task';
    this.getAllRequiredDetailsForTasks();
    this.prjDataSharedService.setAddTaskTitle(false);
    this.router.navigate(['prjAddTask']);
    this.isTaskStartDate = false;
  }

  addUpdateTask() {

    if (this.isEditTask) {

      let editExecution: boolean = false;

      if (this.newProjectDetails !== undefined && this.newProjectDetails !== null) {

        const projectEndDate = new Date(this.newProjectDetails.projectEndDate);
        const taskEndDate = new Date(this.taskEndDate);

        if (projectEndDate > taskEndDate) {
          editExecution = true;
        } else {
          editExecution = false;
          this.prjModalService.modelOpen('Validation', 'Task End date should be lesser than or equal to task end date', '', [], true, '', false, false);
        }

      } else {

        let editConstData: ViewProjectTasks;

        this.resultProjectList.forEach(proj => {
          if (proj.projectId === this.editData.projectId) {
            editConstData = proj;
          }
        })

        const projectEndDate = new Date(editConstData.projectEndDate);
        const taskEndDate = new Date(this.taskEndDate);


        if (projectEndDate > taskEndDate) {
          editExecution = true;
        } else {
          editExecution = false;
          this.prjModalService.modelOpen('Validation', 'Task End date should be lesser than or equal to project end date', '', [], true, '', false, false);
        }

      }

      if (editExecution) {
        this.prjModalService.modelOpen('Confirmation', 'Are you sure want to add this Task?', '', [], true, '', false, true);

        this.prjDataSharedService.isConfirmationValueMessage.subscribe(isValue => {

          if (isValue) {

            const updateTask = new ViewTasks();

            if (this.newProjectDetails !== null && this.newProjectDetails !== undefined) {

              updateTask.projectId = this.newProjectDetails.projectId;
              updateTask.projectDesc = this.newProjectDetails.projectName;

            } else {
              updateTask.projectId = this.editData.projectId;
              updateTask.parentDesc = this.editData.projectDesc;
            }

            updateTask.taskName = this.newTaskName;
            updateTask.taskStartDate = this.taskStartDate;
            updateTask.taskEndDate = this.taskEndDate;
            updateTask.priority = this.projectStepperValue;
            updateTask.taskStatusId = this.editData.taskStatusId
            updateTask.taskStatus = this.editData.taskStatus;
            updateTask.taskId = this.editData.taskId;

            if (this.newParentTask !== null && this.newParentTask !== undefined) {
              updateTask.parentId = this.newParentTaskDetails.parentId;
              updateTask.parentDesc = this.newParentTaskDetails.parentDesc;
            } else {
              updateTask.parentId = this.editData.parentId;
              updateTask.parentDesc = this.editData.parentDesc;
            }

            if (this.newUserDetails !== null && this.newUserDetails !== undefined) {
              updateTask.taskUserId = this.newUserDetails.userId;
            } else {
              updateTask.taskUserId = this.editData.taskUserId;
            }


            this.prjTaskService.updateTaskToDatabase(updateTask).subscribe((data: any) => {

              this.resetAddTaskData();
              this.prjModalService.modelOpen('Success', 'Task Updated successfully', '', [], true, '', false, false);


            })

          }
        })

      }


    } else {

      if (this.isParentTask) {

        if (this.newTaskName !== null && this.newTaskName !== undefined) {

          this.prjModalService.modelOpen('Confirmation', 'Are you sure want to add this Parent Task?', '', [], true, '', false, true);

          this.prjDataSharedService.isConfirmationValueMessage.subscribe(isValue => {

            if (isValue) {
              const parentTask = new AddParentTasks();

              parentTask.parentDesc = this.newTaskName;

              this.prjTaskService.addParentTaskToDatabase(parentTask).subscribe((data: any) => {

                this.resetAddTaskData();
                this.prjModalService.modelOpen('Success', 'Parent Task added successfully', '', [], true, '', false, false);

              })
            }
          })

        } else {

          this.prjModalService.modelOpen('Validation', 'Parent Task is blank. Please enter the parent task and try again.', '', [], true, '', false, false);


        }

      } else {

        if (this.newProjectName !== null && this.newProjectName !== undefined && this.newManagerName !== null && this.newManagerName !== undefined) {



          const projectStartDate = new Date(this.newProjectDetails.projectStartDate);
          const projectEndDate = new Date(this.newProjectDetails.projectEndDate);


          if (this.taskStartDate >= projectStartDate) {

            if (this.taskEndDate >= this.taskStartDate) {

              if (projectEndDate >= this.taskEndDate) {

                this.prjModalService.modelOpen('Confirmation', 'Are you sure want to add this Task?', '', [], true, '', false, true);

                this.prjDataSharedService.isConfirmationValueMessage.subscribe(isValue => {

                  if (isValue) {

                    const updateTask = new AddTasks();
                    updateTask.projectId = this.newProjectDetails.projectId;
                    updateTask.projectDesc = this.newProjectDetails.projectName;
                    updateTask.taskName = this.newTaskName;
                    updateTask.taskStartDate = this.taskStartDate;
                    updateTask.taskEndDate = this.taskEndDate;
                    updateTask.priority = this.projectStepperValue;
                    updateTask.taskStatusId = 2
                    updateTask.taskStatus = "In Progress"
                    if (this.newParentTask !== null && this.newParentTask !== undefined) {
                      updateTask.parentId = this.newParentTaskDetails.parentId;
                      updateTask.parentDesc = this.newParentTaskDetails.parentDesc;
                    }

                    updateTask.taskUserId = this.newUserDetails.userId;

                    this.prjTaskService.addTaskToDatabase(updateTask).subscribe((data: any) => {

                      this.resetAddTaskData();
                      this.prjModalService.modelOpen('Success', 'Task added successfully', '', [], true, '', false, false);


                    })
                  }
                })

              } else {
                this.prjModalService.modelOpen('Validation', 'Task End date should be lesser than or equal to task end date', '', [], true, '', false, false);
              }
            } else {
              this.prjModalService.modelOpen('Validation', 'Task End date should be greater than or equal to task start date', '', [], true, '', false, false);
            }

          } else {

            this.prjModalService.modelOpen('Validation', 'Task start date should be greater than or equal to project start date', '', [], true, '', false, false);

          }



        } else {

          this.prjModalService.modelOpen('Validation', 'Mandatory fields are blank, please enter the required field and try again', '', [], true, '', false, false);
        }

      }

    }

  }
}
