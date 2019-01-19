import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// router navigation to all components
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadMenuComponent(this.selectedMenuLink);
  }

  loadMenuComponent(inputLink: string) {

    this.selectedMenuLink = inputLink;

    if (this.selectedMenuLink === 'vTask') {
      this.router.navigate(['prjViewTask']);
    } else if (this.selectedMenuLink === 'task') {
      this.router.navigate(['prjAddTask']);
    } else if (this.selectedMenuLink === 'project') {
      this.router.navigate(['prjAddProject']);
    } else if (this.selectedMenuLink === 'user') {
      this.router.navigate(['prjAddUser']);
    }
  }

}
