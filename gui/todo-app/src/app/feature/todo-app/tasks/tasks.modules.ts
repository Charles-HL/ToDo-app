import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './page/tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    TranslateModule.forChild({
      extend: true
    }),
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
