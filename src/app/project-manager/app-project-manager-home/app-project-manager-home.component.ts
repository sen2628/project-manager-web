import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-app-project-manager-home',
  templateUrl: './app-project-manager-home.component.html',
  styleUrls: ['./app-project-manager-home.component.scss']
})
export class AppProjectManagerHomeComponent implements OnInit {

  // app initialize variables

  appTitle: string = 'Project Manager';

  constructor() { }

  ngOnInit() {
  }

}
