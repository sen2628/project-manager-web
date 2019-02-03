import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// router navigation to all components
import { Router } from '@angular/router';
import { DataSharedService } from '../project-manager-service/project-manager-data-exchange.service';

@Component({
  selector: 'app-app-project-manager-home',
  templateUrl: './app-project-manager-home.component.html',
  styleUrls: ['./app-project-manager-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppProjectManagerHomeComponent implements OnInit {

  // app initialize variables

  appTitle: string = 'Project Manager';
  selectedMenuLink: string = 'vTask';
  menuLink: string = 'Add Task';
  isEditMenuValue: boolean;

  constructor(private router: Router,
    private dataSharedService: DataSharedService) { }

  ngOnInit() {
    this.loadMenuComponent(this.selectedMenuLink);
  }

  ngDoCheck() {

    this.dataSharedService.isAddTaskMenuMessage.subscribe((isValue) => {
      this.isEditMenuValue = isValue;
      this.thisChangeMenuTitle();
    })


  }

  thisChangeMenuTitle() {
    if (this.isEditMenuValue) {
      this.menuLink = 'Edit Task';
      this.selectedMenuLink = 'task';
    } else {
      this.menuLink = 'Add Task';
    }
  }

  loadMenuComponent(inputLink: string) {

    this.selectedMenuLink = inputLink;

    if (this.selectedMenuLink === 'vTask') {
      this.dataSharedService.setAddTaskTitle(false);
      this.router.navigate(['prjViewTask']);
    } else if (this.selectedMenuLink === 'task') {
      if (this.isEditMenuValue) {

        this.router.navigate(['prjEditTask']);

      } else {
        this.router.navigate(['prjAddTask']);
      }
    } else if (this.selectedMenuLink === 'project') {
      this.dataSharedService.setAddTaskTitle(false);
      this.router.navigate(['prjAddProject']);
    } else if (this.selectedMenuLink === 'user') {
      this.dataSharedService.setAddTaskTitle(false);
      this.router.navigate(['prjAddUser']);
    }
  }

}
