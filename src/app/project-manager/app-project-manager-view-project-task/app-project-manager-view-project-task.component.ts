import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model';
import { ViewTasks } from '../project-manager-models/project_manager_view_tasks.model';

const tempResults: ViewTasks[] = [
  { projectId: 1000, projectDesc: 'FSD Test Project', taskId: 1, taskDesc: 'Coding', parentId: 2000, parentDesc: 'Development', priority: 10, taskStartDate: '01-JAN-2019', taskEndDate: '25-JAN-2019' },
  { projectId: 1000, projectDesc: 'FSD Test Project', taskId: 2, taskDesc: 'Unit Testing', parentId: 2000, parentDesc: 'Development', priority: 20, taskStartDate: '01-JAN-2019', taskEndDate: '25-JAN-2019' },
  { projectId: 1001, projectDesc: 'FSD Test Project', taskId: 3, taskDesc: 'Run JUnit Test Cases', parentId: null, parentDesc: null, priority: 0, taskStartDate: '01-JAN-2019', taskEndDate: '25-JAN-2019' }
]

@Component({
  selector: 'app-app-project-manager-view-project-task',
  templateUrl: './app-project-manager-view-project-task.component.html',
  styleUrls: ['./app-project-manager-view-project-task.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppProjectManagerViewProjectTaskComponent implements OnInit {

  sortByColumn: string = null;
  sortAscDscFlag: boolean;


  resultProjectTasks: ViewTasks[] = [];
  sortedResultsProjectTasksData: ViewTasks[] = [];


  constructor() { }

  ngOnInit() {

    this.setDataForGridLoad();
    console.log(JSON.stringify(this.resultProjectTasks));

  }

  setDataForGridLoad() {

    this.resultProjectTasks = tempResults;

  }

  sortProjectListView(sortByString: string) {

    this.sortByColumn = sortByString;

    if (this.sortAscDscFlag) {
      this.sortAscDscFlag = false;
    } else {
      this.sortAscDscFlag = true;
    }

  }

  editProjectTasks(taskId: number) {

  }


  endProjectTasks(taskId: number) {

  }

}
