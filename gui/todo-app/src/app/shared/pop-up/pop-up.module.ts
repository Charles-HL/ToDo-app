import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';



@NgModule({
  declarations: [
    GenericPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
  entryComponents: [
    MatDialogModule,
  ],
  exports: [
    GenericPopupComponent,
  ]
})
export class PopUpModule { }
