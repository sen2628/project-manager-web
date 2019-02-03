import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataSharedService {

  isConfirmationValue: boolean;
  isConfirmationValueMessage = new BehaviorSubject<boolean>(this.isConfirmationValue);

  isAddTaskMenu: boolean;
  isAddTaskMenuMessage = new BehaviorSubject<boolean>(this.isAddTaskMenu)

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
}
