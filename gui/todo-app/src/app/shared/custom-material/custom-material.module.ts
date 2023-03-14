import { NgModule } from '@angular/core';
import { RoundCheckbox } from './components/round-checkbox/round-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    RoundCheckbox,
  ],
  imports: [
    MatCheckboxModule
  ],
  exports: [
    RoundCheckbox,
  ]
})
export class CustomMaterialModule { }
