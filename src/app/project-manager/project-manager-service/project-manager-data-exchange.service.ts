import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewTasks } from '../project-manager-models/project_manager_view_tasks.model';


@Injectable()
export class DataSharedService {

  isConfirmationValue: boolean;
  isConfirmationValueMessage = new BehaviorSubject<boolean>(this.isConfirmationValue);

  isAddTaskMenu: boolean;
  isAddTaskMenuMessage = new BehaviorSubject<boolean>(this.isAddTaskMenu)

  isEditData: ViewTasks = null;
  isEditDataMessage = new BehaviorSubject(this.isEditData);


  constructor() { }


  setConfirmationValue(isYesNo: boolean) {
    this.isConfirmationValueMessage.next(isYesNo);
    this.isConfirmationValue = isYesNo;
  }

  returnIsConfirmationValue() {
    return this.isConfirmationValue;
  }

  setAddTaskTitle(isEditTitle: boolean) {
    this.isAddTaskMenuMessage.next(isEditTitle);
    this.isAddTaskMenu = isEditTitle;
  }

  setEditData(taskDetails: ViewTasks) {
    this.isEditDataMessage.next(taskDetails);
    this.isEditData = taskDetails;
  }
}
