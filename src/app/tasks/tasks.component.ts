import { Component, OnInit, ViewChild } from '@angular/core';
import { Tasks, Task, TasksService, TasksEvents } from '../services/tasks.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  selectedValues: string[] = [];
  tasksList:Task[];
  statuses: any[];
  displayBasic: boolean;
  selectedBy: any = null;
  submitted = false;
  tasksEvents:TasksEvents[]=[];
  displayCalender:boolean;
  taskForm: FormGroup;

  options: any;
 


  tasksType: any[] = [
    {name: 'Global', value: true},
    {name: 'Personal', value: false},
    {name: 'Leader', value: true},
   
];
  
  @ViewChild('dt') table: Table;
  
  constructor(private messageService: MessageService, private tasksService:TasksService, private formBuilder: FormBuilder){

  }

  
  
  ngOnInit() {

     this.tasksService.getTasks().subscribe((data:Tasks)=>{
      this.tasksList=data.tasks;
      this.tasksList.forEach(data=>{
        this.tasksEvents.push({title:data.text,start:data.start,end:data.end});
      })
     // console.log(this.tasksEvents);
      
      },(error)=>{console.log(error)});

      this.statuses = [
        {label: 'Complete', value: true},
        {label: 'Incommplete', value: false},
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2019-09-01',
      header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
      }
     }

     this.taskForm = this.formBuilder.group({
      text: ['', Validators.required],
      creator: ['', Validators.required],
      taskBy: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
      });

  }

   save($event) {
     console.log($event)

     let severity=($event===true)?'success':'warn';
     this.messageService.add({severity:severity,summary:'Task Status', detail:'Task status changed successfully '});
    
   }

   onDateSelect(value,column) {
    this.table.filter(this.formatDate(value),column , 'equals')
}

formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
      month = '0' + month;
  }

  if (day < 10) {
      day = '0' + day;
  }

  return date.getFullYear() + '-' + month + '-' + day;
}


showBasicDialog() {
  this.displayBasic = true;
}

showBasicCalender(){
  this.displayCalender=true;
}



get f() { return this.taskForm.controls; }

onSubmit() {
    //console.log('to submit form');
    this.submitted = true;

    // stop here if form is invalid
    if (this.taskForm.invalid) {
        return;
    }

    // display form values on success
   
  // console.log('form success',this.taskForm.value);
   const startDate=this.formatDate(this.taskForm.value.start)
   const endDate=this.formatDate(this.taskForm.value.end);

   const addTask={
     'text': this.taskForm.value.text,
      'creator': this.taskForm.value.creator,
      'isCompleted': false,
      'isGlobal':false,
      'isLeader':false,
      'start':startDate,
      'end':endDate
    }
   
   if(this.taskForm.value.taskBy.name==='Global'){
    addTask.isGlobal=this.taskForm.value.taskBy.value;  
   }else if(this.taskForm.value.taskBy.name==='Personal'){
    addTask.isGlobal=this.taskForm.value.taskBy.value;
   }else{
     addTask.isLeader=this.taskForm.value.taskBy.value;
   }   
   //console.log('form success',addTask);
   this.tasksList.push(addTask);
   this.displayBasic = false;
   this.taskForm.reset();
   this.messageService.add({severity:'success',summary:'Add Task', detail:'Task added successfully '});
    

}

  onReset() {
      this.submitted = false;
      this.taskForm.reset();
  }
 

}
