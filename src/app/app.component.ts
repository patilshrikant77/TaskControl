import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TasksService } from './services/tasks.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TasksControl';
  display=true;
  myTask:any=0;
  personalTask:any=0;


  constructor( private tasksService:TasksService){

  }
  
  ngOnInit() {

    this.tasksService.TaskCounts.subscribe(taskCnt=>{
      this.myTask=taskCnt.myTask;
      this.personalTask=taskCnt.teamTask;
    });

  }
 
  
}
