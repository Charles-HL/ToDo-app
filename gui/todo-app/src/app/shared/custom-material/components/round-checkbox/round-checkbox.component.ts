import { Component, OnInit, Output, ViewEncapsulation, Input, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CheckboxData } from 'src/app/shared/models/checkbox/checkbox-data';

@Component({
  selector: 'app-round-checkbox',
  templateUrl: './round-checkbox.component.html',
  styleUrls: ['./round-checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RoundCheckbox implements OnInit {

  @Input() checked: boolean = false;
  @Input() data_id: number = -1;

  @Output() onChange = new EventEmitter<CheckboxData>();

  constructor() { }

  ngOnInit(): void {
  }

  onChangeHandler(event: MatCheckboxChange) {
    this.onChange.emit({
      checked: event.checked,
      data_id: this.data_id
    });
  }

}
