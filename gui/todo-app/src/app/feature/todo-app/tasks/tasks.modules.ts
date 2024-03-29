import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './page/tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CustomMaterialModule } from 'src/app/shared/custom-material/custom-material.module';
import { MatIconModule } from '@angular/material/icon';
import { PopUpModule } from 'src/app/shared/pop-up/pop-up.module';


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    CustomMaterialModule,
    TranslateModule.forChild({
      extend: true
    }),
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    PopUpModule
  ]
})
export class TasksModule { }
