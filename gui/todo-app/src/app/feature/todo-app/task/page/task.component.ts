import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Task } from 'src/app/shared/models/dto/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

}
