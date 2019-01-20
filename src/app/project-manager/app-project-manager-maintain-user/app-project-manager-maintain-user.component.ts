import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-app-project-manager-maintain-user',
  templateUrl: './app-project-manager-maintain-user.component.html',
  styleUrls: ['./app-project-manager-maintain-user.component.scss']
})
export class AppProjectManagerMaintainUserComponent implements OnInit {

  componentTitle: string = 'Maintain User';
  addUpdateButton: string = "Add User";
  newUpdateFirstName: string = null;
  newUpdateLastName: string = null;
  newUpdateEmployeeId: number = null;

  constructor() { }

  ngOnInit() {
  }

}
