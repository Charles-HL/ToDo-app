import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ApiService } from 'src/app/core/services/api.service';
import { CheckboxData } from 'src/app/shared/models/checkbox/checkbox-data';
import { Task } from 'src/app/shared/models/dto/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  tasksUnDone: Task[] = [];
  tasksDone: Task[] = [];

  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTasks().subscribe((res: Task[]) => {
      this.tasksUnDone = res.filter((task: Task) => !task.done);
      this.tasksDone = res.filter((task: Task) => task.done);
    });
  }

  taskStateUpdated(checkboxData: CheckboxData) {
    this.apiService.postIsTaskDone(checkboxData.data_id, checkboxData.checked).subscribe((res: Task) => {
      const allTasks = this.tasksUnDone.concat(this.tasksDone)
      const index = allTasks.findIndex(task => task.id === res.id);
      allTasks[index] = res;

      let unDoneTasks: Task[] = []
      let doneTasks: Task[] = []
      allTasks.forEach((task: Task) => {
        if (task.done === true) {
          doneTasks.push(task);
        } else{
          unDoneTasks.push(task);
        }
      });
      this.tasksUnDone = unDoneTasks;
      this.tasksDone = doneTasks;
    });

  }

}
