import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model';
import { ViewTasks } from '../project-manager-models/project_manager_view_tasks.model';
import { Sort } from '@angular/material';
import { TaskService } from '../project-manager-service/project-manager-tasks.service';
import { ProjectService } from '../project-manager-service/project-manager-project.service';
import { DataSharedService } from '../project-manager-service/project-manager-data-exchange.service';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


/* const tempResults: ViewTasks[] = [
  { projectId: 1000, projectDesc: 'FSD Test Project', taskId: 1, taskDesc: 'Coding', parentId: 2000, parentDesc: 'Development', priority: 10, taskStartDate: '01-JAN-2019', taskEndDate: '25-JAN-2019', taskStatus: 'Completed' },
  { projectId: 1000, projectDesc: 'FSD Test Project', taskId: 2, taskDesc: 'Unit Testing', parentId: 2000, parentDesc: 'Development', priority: 20, taskStartDate: '05-JAN-2019', taskEndDate: '25-JAN-2019', taskStatus: 'Completed' },
  { projectId: 1001, projectDesc: 'FSD Test Project', taskId: 3, taskDesc: 'Run JUnit Test Cases', parentId: null, parentDesc: null, priority: 0, taskStartDate: '09-JAN-2019', taskEndDate: '25-JAN-2019', taskStatus: 'In Progress' }
] */

@Component({
  selector: 'app-app-project-manager-view-project-task',
  templateUrl: './app-project-manager-view-project-task.component.html',
  styleUrls: ['./app-project-manager-view-project-task.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppProjectManagerViewProjectTaskComponent implements OnInit {

  sortByColumn: string = null;
  sortAscDscFlag: boolean;

  projectSearch: string;
  projectSearchId: number;


  resultProjectTasks: ViewTasks[] = [];
  sortedResultsProjectTasksData: ViewTasks[] = [];
  resultProjectTasksSortedData: ViewTasks[];

  resultProjects: ViewProjectTasks[] = [];
  resultProjectNoSuspend: ViewProjectTasks[] = [];

  resultProjectList: ViewProjectTasks[] = [];
  filterResultProjectList: ViewProjectTasks[] = [];

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

  constructor(private prjTaskService: TaskService,
    private prjProjectService: ProjectService,
    private prjDataSharedService: DataSharedService,
    private prjModalService: ProjectManagerDisplayComponent,
    private selectionModalService: NgbModal,
    private router: Router
  ) {
    this.setDataForGridLoad();
  }


  ngOnInit() {
  }

  sortData(sort: Sort) {
    const data = this.sortedResultsProjectTasksData;
    if (!sort.active || sort.direction === '') {
      this.resultProjectTasksSortedData = data;
      return;
    }

    this.resultProjectTasksSortedData =
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'taskStartDate': return compare(a.taskStartDate.toDateString(), b.taskStartDate.toDateString(), isAsc);
          case 'taskEndDate': return compare(a.taskEndDate.toDateString(), b.taskEndDate.toDateString(), isAsc);
          case 'priority': return compare(a.priority, b.priority, isAsc);
          case 'taskStatus': return compare(a.taskStatus, b.taskStatus, isAsc);
          default: return 0;
        }
      });
  }


  setDataForGridLoad() {

    this.prjTaskService.getAllTasks().subscribe((data: any) => {
      this.resultProjectTasks = data;

      this.prjProjectService.getAllProjects().subscribe((data: any) => {
        this.resultProjects = data;

        this.resultProjectList = this.resultProjects;
        this.filterResultProjectList = this.resultProjects;

        this.resultProjectNoSuspend = this.resultProjects.filter(prj => prj.status !== "Suspended");

        let tempProjectResult: ViewProjectTasks[] = this.resultProjectNoSuspend.filter(prj => prj.totalTasks >= 1);

        if (this.resultProjectNoSuspend.length > 0) {
          this.resultProjectTasksSortedData = this.resultProjectTasks.filter(task => task.projectId === tempProjectResult[0].projectId).slice();
          this.sortedResultsProjectTasksData = this.resultProjectTasksSortedData;
          this.projectSearch = tempProjectResult[0].projectName;
        }

      })

    })


  }

  sortProjectListView(sortByString: string) {

    this.sortByColumn = sortByString;

    if (this.sortAscDscFlag) {
      this.sortAscDscFlag = false;
    } else {
      this.sortAscDscFlag = true;
    }

  }

  editProjectTasks(taskDet: ViewTasks) {

    this.prjDataSharedService.setEditData(taskDet);
    this.prjDataSharedService.setAddTaskTitle(true);
    this.router.navigate(['prjEditTask']);
  }


  endProjectTasks(taskDet: ViewTasks) {

    const dateSet = new Date();
    dateSet.setDate(dateSet.getDate());
    taskDet.taskEndDate = dateSet;
    taskDet.taskStatus = 'Completed';
    taskDet.taskStatusId = 3;

    this.prjModalService.modelOpen('Confirmation', 'Are you sure want to end this Task?', '', [], true, '', false, true);


    this.prjDataSharedService.isConfirmationValueMessage.subscribe(isValue => {

      if (isValue) {

        this.prjTaskService.updateTaskToDatabase(taskDet).subscribe((data: any) => {

          this.prjTaskService.getAllTasks().subscribe((data: any) => {
            this.resultProjectTasks = data;
            this.resultProjectTasksSortedData = this.resultProjectTasks.filter(task => task.projectId === this.projectSearchId).slice();
            this.sortedResultsProjectTasksData = this.resultProjectTasksSortedData;
            this.prjModalService.modelOpen('Success', 'Task completed successfully', '', [], true, '', false, false);

          })

        })
      }
    })

  }



  projectModelRowClick(projectDetails: ViewProjectTasks) {

    this.projectSearch = projectDetails.projectName;
    this.resultProjectTasksSortedData = this.resultProjectTasks.filter(task => task.projectId === projectDetails.projectId).slice();
    this.sortedResultsProjectTasksData = this.resultProjectTasksSortedData;

  }

  projectSearchFunction(content) {

    this.selectionModalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }



}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
