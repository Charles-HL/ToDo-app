import { Observable } from "rxjs";
import { CheckboxData } from "../checkbox/checkbox-data";
import { Task } from "../dto/task";
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
  hasHtmlArea?: boolean;
  htmlAreaTitle?: string;
  taskDetail?: boolean;
  task?: Task;
  returnToTaskList?: () => void;
  taskStateUpdated?: (checkboxData: CheckboxData) => Observable<Task>;
}
