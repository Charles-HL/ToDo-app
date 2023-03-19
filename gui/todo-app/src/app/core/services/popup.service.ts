/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { CheckboxData } from 'src/app/shared/models/checkbox/checkbox-data';
import { Task } from 'src/app/shared/models/dto/task';
import { PopupModel } from 'src/app/shared/models/popup/popup-model';
import { GenericPopupComponent } from 'src/app/shared/pop-up/components/generic-popup/generic-popup.component';

export enum MAT_DIALOG_WIDTH {
  SMALL = '450px',
  MEDIUM = '600px',
  LARGE = '850px'
}

/**
 * Service to manage the popups
 */
@Injectable({
  providedIn: 'root',
})
export class PopupService {
  modalPopupGeneric: MatDialogRef<GenericPopupComponent> | undefined = undefined;
  themeSub: Subscription = new Subscription();

  constructor(
    private matDialog: MatDialog
  ) {
  }

  /**
   * Call a simple popup
   * @param message the message to display
   * @param description the description to display
   */
  callPopupSimple(message: string, description: string | undefined = undefined): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.SMALL,
      panelClass: ['generic-popup', 'popup-simple'],
      data: {
        title: message,
        description: description,
        validateAction: { isActive: true, action_label: 'Ok' },
        cancelAction: { isActive: false, action_label: '' },
        hasTextArea: false,
      } as PopupModel,
    });
  }

  /**
   * Call a popup with detail option
   * @param message message
   * @param detailMessage detail message
   * @param description description
   * @param htmlContent html content
   */
  callPopupDetails(message: string, detailMessage: string, description: string | undefined = undefined, htmlContent: string | undefined = undefined): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.SMALL,
      panelClass: ['generic-popup', 'popup-detail-close'],
      data: {
        title: message,
        description: description,
        validateAction: { isActive: true, action_label: 'Ok' },
        cancelAction: { isActive: false, action_label: '' },
        detailsLink: true,
        hasHtmlArea: htmlContent !== undefined,
        htmlAreaTitle: htmlContent
      } as PopupModel,
    });
    this.modalPopupGeneric
      .afterClosed()
      .subscribe((userAction: boolean | string) => {
        if (userAction === 'details') {
          this.openDetails(
            message,
            detailMessage
          );
        }
      });
  }

  /**
   * Call a yes no popup
   * @param message message
   * @returns observable boolean
   */
  callYesNoPopupDetails(message: string): Observable<boolean> {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.SMALL,
      panelClass: ['generic-popup', 'popup-simple'],
      data: {
        title: message,
        validateAction: { isActive: true, action_label: 'Yes' },
        cancelAction: { isActive: true, action_label: 'No' },
        hasTextArea: false,
      } as PopupModel,
    });
    return this.modalPopupGeneric.afterClosed();
  }

  /**
   * Open a popup to display a task
   * @param task the task
   * @param returnToTaskList the method to call to return to the task list page 
   * @param taskStateUpdated the method to call to update the task state
   */
  openTask(task: Task, returnToTaskList: () => void, taskStateUpdated: (checkboxData: CheckboxData) => Observable<Task>): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.LARGE,
      panelClass: ['generic-popup', 'background-primary', 'task-popup'],
      
      data: {
        title: task.name,
        validateAction: {
          isActive: false,
          action_label: '',
        },
        cancelAction: { isActive: false, action_label: '' },
        hasTextArea: false,
        taskDetail: true,
        task: task,
        returnToTaskList: returnToTaskList,
        taskStateUpdated: taskStateUpdated,
      } as PopupModel,
    });
    this.modalPopupGeneric
      .afterClosed()
      .subscribe((res: any) => {
        returnToTaskList();
      });
  }

  /**
   * Open a popup to add a task
   * @param addTask the method to call to add the task
   */
  openAddTask(addTask: (task: Task) => void): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.MEDIUM,
      panelClass: ['generic-popup', 'background-primary', 'add-task-popup'],
      
      data: {
        validateAction: {
          isActive: true,
          action_label: 'Validate',
        },
        cancelAction: { isActive: true, action_label: 'Cancel' },
        hasTextArea: false,
        taskDetail: false,
        addTask: true,
      } as PopupModel,
    });
    this.modalPopupGeneric
      .afterClosed()
      .subscribe((res: Task | undefined) => {
        if (res !== undefined) {
          addTask(res);
        }
      });
  }

  private openDetails(message: string, detailMessage: string): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.MEDIUM,
      panelClass: ['generic-popup', 'popup-detail-open'],
      data: {
        title: message,
        validateAction: { isActive: true, action_label: 'Ok' },
        cancelAction: { isActive: false, action_label: '' },
        hasTextArea: true,
        textAreaTitle: 'Error details',
        textAreaContent: detailMessage,
      } as PopupModel,
    });
  }
}
