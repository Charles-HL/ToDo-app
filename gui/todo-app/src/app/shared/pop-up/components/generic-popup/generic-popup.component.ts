import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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

}
