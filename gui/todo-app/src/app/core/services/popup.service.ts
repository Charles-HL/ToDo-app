import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { PopupModel } from 'src/app/shared/models/popup/popup-model';
import { GenericPopupComponent } from 'src/app/shared/pop-up/components/generic-popup/generic-popup.component';

export enum MAT_DIALOG_WIDTH {
  SMALL = '450px',
  MEDIUM = '600px',
  LARGE = '850px'
}

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

  callPopupSimple(message: string, description: string | undefined = undefined): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.SMALL,
      panelClass: ['-generic-popup', 'popup-simple'],
      data: {
        title: message,
        description: description,
        validateAction: { isActive: true, action_label: 'Ok' },
        cancelAction: { isActive: false, action_label: '' },
        hasTextArea: false,
      } as PopupModel,
    });
  }

  callPopupDetails(message: string, detailMessage: string, description: string | undefined = undefined, htmlContent: string | undefined = undefined): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.SMALL,
      panelClass: ['-generic-popup', 'popup-detail-close'],
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

  callYesNoPopupDetails(message: string): Observable<boolean> {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.SMALL,
      panelClass: ['-generic-popup', 'popup-simple'],
      data: {
        title: message,
        validateAction: { isActive: true, action_label: 'Yes' },
        cancelAction: { isActive: true, action_label: 'No' },
        hasTextArea: false,
      } as PopupModel,
    });
    return this.modalPopupGeneric.afterClosed();
  }

  private openDetails(message: string, detailMessage: string): void {
    this.modalPopupGeneric = this.matDialog.open(GenericPopupComponent, {
      width: MAT_DIALOG_WIDTH.MEDIUM,
      panelClass: ['-generic-popup', 'popup-detail-open'],
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
