import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-project-manager-maintain-project-task',
  templateUrl: './app-project-manager-maintain-project-task.component.html',
  styleUrls: ['./app-project-manager-maintain-project-task.component.scss']
})
export class AppProjectManagerMaintainProjectTaskComponent implements OnInit {

  projectStepperValue: number = 0;
  taskStartDate = new Date();
  taskEndDate = new Date();

  taskButtonTitle: string = "Add Task";

  constructor() {
    this.taskButtonTitle = "Add Task";
    this.projectStepperValue = 0;



  }

  ngOnInit() {
    this.taskButtonTitle = "Add Task";
    this.projectStepperValue = 0;
  }

}
