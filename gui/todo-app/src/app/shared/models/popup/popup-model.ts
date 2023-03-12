import { ActionBtnType } from "./action-btn-type";

export interface PopupModel {
  validateAction: ActionBtnType;
  cancelAction: ActionBtnType;
  title: string;
  description?: string;
  hasTextArea: boolean;
  textAreaTitle?: string;
  textAreaContent?: string;
  detailsLink?: boolean;
  aboutPopin?: boolean;
  hasHtmlArea?: boolean;
  htmlAreaTitle?: string;
}
