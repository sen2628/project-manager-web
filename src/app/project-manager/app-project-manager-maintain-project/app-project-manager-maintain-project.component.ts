import { Component, OnInit } from '@angular/core';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model'
import { Sort } from '@angular/material';
import { ProjectService } from '../project-manager-service/project-manager-project.service';
import { ProjectManagerDisplayComponent } from '../app-project-manager-modal/app-project-manager-modal.component';

const tempProjectResult: ViewProjectTasks[] = [
  { "projectId": 1000, "projectName": "FSD Program", "projectStartDate": "01-01-2019", "projectEndDate": "01-31-2019", "priority": 0, "status": "Completed", "userId": 100, "completeTasks": 3, "totalTasks": 3 },
  { "projectId": 1001, "projectName": "Logistics Program", "projectStartDate": "01-01-2019", "projectEndDate": "01-31-2019", "priority": 0, "status": "Completed", "userId": 100, "completeTasks": 3, "totalTasks": 5 },
  { "projectId": 1002, "projectName": "Machine Learning Program", "projectStartDate": "01-01-2019", "projectEndDate": "01-31-2019", "priority": 0, "status": "Completed", "userId": 100, "completeTasks": 5, "totalTasks": 9 }
]

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
  newProjectStartDate: string;
  newProjectEndDate: string;


  dynamicGrid: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 3, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 3, color: 'lightgreen' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
    { text: 'Three', cols: 3, rows: 1, color: 'lightpink' },
  ];

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
    private prjModalService: ProjectManagerDisplayComponent) {
    this.projectStepperValue = 0;
    this.setNewProjectDates();
    this.getAllProjectDetailsFromDatabase();
  }

  ngOnInit() {

  }

  setNewProjectDates() {

    let setStartDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    console.log(setStartDate);
  }

  getAllProjectDetailsFromDatabase() {

    this.prjApiService.getAllProjects().subscribe((data: any) => {

      this.resultProjectList = data;
      this.updateResultColumn();
      this.prepareDataForSort();

    })

  }

  updateResultColumn() {

    if (this.resultProjectList !== null && this.resultProjectList !== undefined) {

      this.resultProjectList.forEach(prjList => {
        if (prjList.totalTasks === prjList.completeTasks && prjList.completeTasks !== 0) {
          prjList.status = 'Completed';
        } else if (prjList.projectStartDate === prjList.projectEndDate) {
          prjList.status = 'Suspended';
        }
      })
    }

  }

  prepareDataForSort() {
    this.resultProjectListSortedData = this.resultProjectList.slice();

  }
  updateAddProjectToDatabase() {

  }

  updateProjectToDatabase() {

  }

  setProjectDetailsForUpdate() {

  }


  resetAddProjectDetails() {

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
          case 'projectStartDate': return compare(a.projectStartDate, b.projectStartDate, isAsc);
          case 'projectEndDate': return compare(a.projectEndDate, b.projectEndDate, isAsc);
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

