import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from "@angular/material/button-toggle"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';
import { MatCardModule } from '@angular/material/card';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';



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
    MatCardModule,
    CustomMaterialModule,
    MatIconModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  entryComponents: [
    MatDialogModule,
  ],
  exports: [
    GenericPopupComponent,
  ]
})
export class PopUpModule { }
