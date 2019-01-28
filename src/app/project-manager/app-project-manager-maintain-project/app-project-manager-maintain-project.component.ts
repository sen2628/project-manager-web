import { Component, OnInit } from '@angular/core';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model'

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

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterResultProjectList = this.filterProjects(value);
  }


  filterProjects(searchString: string) {
    //  console.log(searchString);
    return this.resultProjectList.filter(projectResult =>
      projectResult.projectName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }


  constructor() { }

  ngOnInit() {
    this.projectStepperValue = 0;
    this.resultProjectList = tempProjectResult;
    this.filterResultProjectList = this.resultProjectList;
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

    if (this.sortAscDscFlag) {
      this.sortAscDscFlag = false;
    } else {
      this.sortAscDscFlag = true;
    }

  }




}
