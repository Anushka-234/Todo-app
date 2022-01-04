import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CreateListComponent } from '../create-list/create-list.component';
import { Task } from 'src/app/shared/task';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  current_date = new Date();
  lists:any[] = [];
  tasks:Task[] =[];
  todaysTask:Task[]=[];
  counttodaytask:number = 0;
  countupcomingtask:number = 0;
  countoverduetask:number = 0;
  taskFormatData : any;
  today:any = Date.now();


  constructor(public matdialog: MatDialog, private service: TaskService, private auth: AuthService) { }

  ngOnInit(): void {
    this.service.getList().subscribe((data) => (this.lists = data));
    this.getTasks();
    console.log(this.lists);
  }

  openaddTask(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-task";
    dialogConfig.height = "401px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(AddTaskComponent, dialogConfig);
    const result = modalDialog.afterClosed()
  }

  openaddList(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-list";
    dialogConfig.height = "304px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(CreateListComponent, dialogConfig);
    const result = modalDialog.afterClosed()

  }

  // getTodaysTask(){
  //   let todaysDate = new Date().toDateString();
  //   console.log(todaysDate)
  //   return this.tasks.filter((task: Task) => {
  //     let taskDate = new Date(task.date).toDateString();
  //     console.log(taskDate)
  //     if (todaysDate == taskDate) {
  //       return task;
  //     }
  //   });
  // }

 

  // getCounts(){
  //   for (let task of this.tasks){
  //     console.log(task.task)
  //     this.taskFormatData = formatDate(task.date, 'YYYY-MM-dd', 'enUS');
  //     console.log(this.taskFormatData)
  //     if(this.taskFormatData == this.today){
  //       this.counttodaytask++
  //     }
  //     if(this.taskFormatData > this.today){
  //       this.countupcomingtask++
  //     }
  //     if(this.taskFormatData < this.today){
  //       this.countoverduetask++
  //     }
  //   }

  // }

  getTasks(){
    this.service.getTasks().subscribe(res => {
      this.tasks = res;
      for (let task of this.tasks){
        this.taskFormatData = formatDate(task.date, 'YYYY-MM-dd', 'en');
        this.today = formatDate(this.today, 'YYYY-MM-dd','en');
        console.log(this.taskFormatData)
        console.log(this.today)
        if(this.taskFormatData == this.today){
          console.log(this.counttodaytask)
          this.counttodaytask++;
        }
        if(this.taskFormatData > this.today){
          this.countupcomingtask++
        }
        if(this.taskFormatData < this.today){
          this.countoverduetask++
        }
        if(this.taskFormatData == this.today){
          this.todaysTask.push(task);
        }
      }
      console.log(this.todaysTask)
    })

  }

  logout() {
    this.auth.logout();
  }

  


}
