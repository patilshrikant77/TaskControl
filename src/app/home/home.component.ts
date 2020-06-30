import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Tasks,TasksService, Task } from '../services/tasks.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedValues: string[] = [];
  globalTasksList:Task[];
  personalTasksList:Task[];
  teamLeaderTasksList:Task[];

  


  constructor(private messageService: MessageService, private tasksService:TasksService){

  }
  
  ngOnInit() {
    this.tasksService.getTasks().subscribe((data:Tasks)=>{
      this.globalTasksList=data.tasks.filter(c=>c.isGlobal===true);
      this.personalTasksList=data.tasks.filter(c=>c.isGlobal===false);
      this.teamLeaderTasksList=data.tasks.filter(c=>c.isLeader===true);
      //console.log(this.personalTasksList.length,this.teamLeaderTasksList.length);
      this.tasksService.updateTaskCounts(this.personalTasksList.length,this.teamLeaderTasksList.length);
     
    },(error)=>{console.log(error)})
  }

   save($event) {
     console.log($event)

     let severity=($event===true)?'success':'warn';
     this.messageService.add({severity:severity,summary:'Task Status', detail:'Task status changed successfully '});
    
   }
  

}
