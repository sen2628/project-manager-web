import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-app-project-manager-modal',
  templateUrl: './app-project-manager-modal.component.html',
  styleUrls: ['./app-project-manager-modal.component.scss']
})
export class AppProjectManagerModalComponent {

  @Input()
  errorHeader: string = null;
  errorSubHeader: string = null;
  errorDetails: string[] = [];
  msgBoxPosition: boolean = false;
  errorMsgStyleClass: string = null;
  errorSingleMsg: string = null;
  stringIndex: boolean = false;
  isConfirmation: boolean = false;

  constructor(public activeModal: NgbActiveModal) { }

}

@Component({
  selector: 'project-manager-modal-service-component',
  template: '<div></div>',
  providers: [NgbModalConfig]
})
export class ProjectManagerDisplayComponent {

  constructor(private modalService: NgbModal, mdlConfig: NgbModalConfig) {
    mdlConfig.backdrop = 'static';
    mdlConfig.keyboard = false;
  }

  modelOpen(erHdr: string, erSHdr: string, errSMsg: string, erDtls: string[], msgPos: boolean, erStyle: string, erIdx: boolean, erConfirmation: boolean) {

    if (msgPos) {
      const modalRef = this.modalService.open(AppProjectManagerModalComponent, { centered: true, windowClass: erStyle });
      modalRef.componentInstance.errorHeader = erHdr;
      modalRef.componentInstance.errorSubHeader = erSHdr;
      modalRef.componentInstance.errorSingleMsg = errSMsg;
      modalRef.componentInstance.errorDetails = erDtls;
      modalRef.componentInstance.msgBoxPosition = msgPos;
      modalRef.componentInstance.errorMsgStyleClass = erStyle;
      modalRef.componentInstance.stringIndex = erIdx;
      modalRef.componentInstance.isConfirmation = erConfirmation;
    } else {
      const modalRef = this.modalService.open(AppProjectManagerModalComponent, { windowClass: erStyle });
      modalRef.componentInstance.errorHeader = erHdr;
      modalRef.componentInstance.errorSubHeader = erSHdr;
      modalRef.componentInstance.errorSingleMsg = errSMsg;
      modalRef.componentInstance.errorDetails = erDtls;
      modalRef.componentInstance.msgBoxPosition = msgPos;
      modalRef.componentInstance.errorMsgStyleClass = erStyle;
      modalRef.componentInstance.stringIndex = erIdx;
      modalRef.componentInstance.isConfirmation = erConfirmation;

    }

  }

  modelOpenLg(erHdr: string, erSHdr: string, errSMsg: string, erDtls: string[], msgPos: boolean, erStyle: string, erIdx: boolean, erConfirmation: boolean) {

    if (msgPos) {
      const modalRef = this.modalService.open(AppProjectManagerModalComponent, { centered: true, size: 'lg', windowClass: erStyle });
      modalRef.componentInstance.errorHeader = erHdr;
      modalRef.componentInstance.errorSubHeader = erSHdr;
      modalRef.componentInstance.errorSingleMsg = errSMsg;
      modalRef.componentInstance.errorDetails = erDtls;
      modalRef.componentInstance.msgBoxPosition = msgPos;
      modalRef.componentInstance.errorMsgStyleClass = erStyle;
      modalRef.componentInstance.stringIndex = erIdx;
      modalRef.componentInstance.isConfirmation = erConfirmation;
    } else {
      const modalRef = this.modalService.open(AppProjectManagerModalComponent, { size: 'lg', windowClass: erStyle });
      modalRef.componentInstance.errorHeader = erHdr;
      modalRef.componentInstance.errorSubHeader = erSHdr;
      modalRef.componentInstance.errorSingleMsg = errSMsg;
      modalRef.componentInstance.errorDetails = erDtls;
      modalRef.componentInstance.msgBoxPosition = msgPos;
      modalRef.componentInstance.errorMsgStyleClass = erStyle;
      modalRef.componentInstance.stringIndex = erIdx;
      modalRef.componentInstance.isConfirmation = erConfirmation;

    }

  }

}


