import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/shared/models/dto/task';
import { PopupModel } from 'src/app/shared/models/popup/popup-model';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenericPopupComponent implements OnInit {

  constructor(
  @Inject(MAT_DIALOG_DATA)
    public data: PopupModel
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  updateTaskState($event: any) {
    if (this.data && this.data.taskStateUpdated) {
      this.data.taskStateUpdated($event).subscribe((task: Task) => {
        this.data.task = task;
      })
    }
  }
}
