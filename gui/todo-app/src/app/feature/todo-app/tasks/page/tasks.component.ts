/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError, map, of, throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { CheckboxData } from 'src/app/shared/models/checkbox/checkbox-data';
import { Task } from 'src/app/shared/models/dto/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasksUnDone: Task[] = [];
  tasksDone: Task[] = [];

  private taskId: number | undefined;
  private routeSub: Subscription | undefined;

  task: Task | undefined;

  constructor(private popupService: PopupService, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private location: Location) { 
  }  
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTasks().subscribe((res: Task[]) => {
      this.tasksUnDone = res.filter((task: Task) => !task.done);
      this.tasksDone = res.filter((task: Task) => task.done);
    });
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['id'] !== undefined && this.taskId !== parseInt(params['id'])) {
        this.taskId = parseInt(params['id']);
        this.openTask(this.taskId);
      } else if (params['id'] === undefined && this.taskId !== undefined) {
        this.task = undefined;
        this.taskId = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  taskStateUpdated(checkboxData: CheckboxData) {
    this.internalTaskStateUpdated(checkboxData).subscribe();
  }

  private internalTaskStateUpdated(checkboxData: CheckboxData): Observable<Task> {
    return this.apiService.postIsTaskDone(checkboxData.data_id, checkboxData.checked).pipe(map((res: Task) => {
      this.updateTaskList(res);
      return res;
    }));
  }

  private updateTaskList(res: Task) {
    let allTasks = this.tasksUnDone.concat(this.tasksDone)
    const index = allTasks.findIndex(task => task.id === res.id);
    allTasks.splice(index, 1)

    let unDoneTasks: Task[] = []
    let doneTasks: Task[] = []
    allTasks.forEach((task: Task) => {
      if (task.done === true) {
        doneTasks.push(task);
      } else{
        unDoneTasks.push(task);
      }
    });
    if (res.done === true) {
      doneTasks.unshift(res);
    } else {
      unDoneTasks.unshift(res);
    }
    this.tasksUnDone = unDoneTasks;
    this.tasksDone = doneTasks;
  }


  openTask(id: number){
    this.location.replaceState('/task/' + id);
    this.taskId = id;
    this.apiService.getTask(id).pipe(catchError((err: HttpErrorResponse) => {
      // if task not found or access not allowed, return to task list
      if (err.status === 404 || err.status === 401) {
        return new Observable((observer) => {
          this.taskId = undefined;
          this.task = undefined;
          this.returnToTaskList();
          observer.complete();
        });
      } else {
        // else throw error
        return throwError(() => err);
      }
    })).subscribe((res: Task) => {
      this.task = res;
      this.popupService.openTask(this.task, this.returnToTaskList.bind(this), this.internalTaskStateUpdated.bind(this));    
    });
  }

  returnToTaskList() {
    this.location.replaceState('/task');
    this.taskId = undefined;
    this.task = undefined;
  }

  openAddTaskDialog() {
    this.popupService.openAddTask(this.addTask.bind(this));
  }

  addTask(task: Task) {
    this.apiService.putTask(task).subscribe((res: Task) => {
      if (res.done === true) {
        this.tasksDone.unshift(res);
      } else {
        this.tasksUnDone.unshift(res);
      }
    });
  }

}
