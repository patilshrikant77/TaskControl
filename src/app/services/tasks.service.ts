import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


export interface Tasks {
   tasks:Array<Task>;
}

export interface Task{
  text: string;
  isGlobal: boolean;
  isLeader: boolean;
  creator: string;
  isCompleted: boolean;
  start:string;
  end:string;
}

export interface TasksEvents {
  title: string;
  start:string;
  end:string
}


@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private dataSource = new BehaviorSubject<any>({});
  TaskCounts = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }
   getTasks(){
      return this.http.get("assets/tasks.json");
   }

   updateTaskCounts(myTask,teamTask){
    this.dataSource.next({myTask:myTask, teamTask:teamTask});
   }

  
}
