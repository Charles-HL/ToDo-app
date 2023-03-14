import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Task } from 'src/app/shared/models/dto/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.apiService.getTasks().subscribe((res: Task[]) => {
      this.tasks = res;
    });
  }

}
