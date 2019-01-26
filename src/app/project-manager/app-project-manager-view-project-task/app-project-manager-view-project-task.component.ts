import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewProjectTasks } from '../project-manager-models/project_manager_view_project_tasks.model';
import { ViewTasks } from '../project-manager-models/project_manager_view_tasks.model';
import { Sort } from '@angular/material';

const tempResults: ViewTasks[] = [
  { projectId: 1000, projectDesc: 'FSD Test Project', taskId: 1, taskDesc: 'Coding', parentId: 2000, parentDesc: 'Development', priority: 10, taskStartDate: '01-JAN-2019', taskEndDate: '25-JAN-2019', taskStatus: 'Completed' },
  { projectId: 1000, projectDesc: 'FSD Test Project', taskId: 2, taskDesc: 'Unit Testing', parentId: 2000, parentDesc: 'Development', priority: 20, taskStartDate: '05-JAN-2019', taskEndDate: '25-JAN-2019', taskStatus: 'Completed' },
  { projectId: 1001, projectDesc: 'FSD Test Project', taskId: 3, taskDesc: 'Run JUnit Test Cases', parentId: null, parentDesc: null, priority: 0, taskStartDate: '09-JAN-2019', taskEndDate: '25-JAN-2019', taskStatus: 'In Progress' }
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
  resultProjectTasksSortedData: ViewTasks[];

  constructor() {
    this.setDataForGridLoad();
    this.resultProjectTasksSortedData = this.resultProjectTasks.slice();
  }


  ngOnInit() {
  }

  sortData(sort: Sort) {
    const data = this.resultProjectTasks.slice();
    if (!sort.active || sort.direction === '') {
      this.resultProjectTasksSortedData = data;
      return;
    }

    this.resultProjectTasksSortedData =
      data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'taskStartDate': return compare(a.taskStartDate, b.taskStartDate, isAsc);
          case 'taskEndDate': return compare(a.taskEndDate, b.taskEndDate, isAsc);
          case 'priority': return compare(a.priority, b.priority, isAsc);
          case 'taskStatus': return compare(a.taskStatus, b.taskStatus, isAsc);
          default: return 0;
        }
      });
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

    if (this.sortByColumn === 'startDate' && this.sortAscDscFlag) {
      this.resultProjectTasks.sort((a, b) => +a.taskStartDate.localeCompare(b.taskStartDate));
    } else {
      this.resultProjectTasks.sort((a, b) => -a.taskStartDate.localeCompare(b.taskStartDate));
    }


  }

  editProjectTasks(taskId: number) {

  }


  endProjectTasks(taskId: number) {

  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
