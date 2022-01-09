import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CreateListComponent } from '../create-list/create-list.component';
import { Task } from 'src/app/shared/task';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  isLoading:boolean = false;


  constructor(public matdialog: MatDialog, private service: TaskService, private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getList().subscribe((data) => (this.lists = data));
    this.getTasks();
    console.log(this.lists);
  }

  openaddTask(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-task";
    dialogConfig.height = "450px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(AddTaskComponent, dialogConfig);
    // modalDialog.afterClosed().subscribe(result => {
    //   this.service.addTask(result);
    // })

  }

  openaddList(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "create-list";
    dialogConfig.height = "304px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(CreateListComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.service.addList(result.subscribe((list:any) => this.lists.push(list)));
    })

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
    this.isLoading = true;
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
          this.isLoading = false;
        }
        if(this.taskFormatData > this.today){
          this.countupcomingtask++;
          this.isLoading = false;
        }
        if(this.taskFormatData < this.today){
          this.countoverduetask++;
          this.isLoading = false;
        }
        if(this.taskFormatData == this.today){
          this.todaysTask.push(task);
          this.isLoading = false;
        
        }
      }
      this.isLoading = false;
      console.log('todays-task',this.todaysTask)
    },
    err=> {
      this.isLoading = false;
      this.toastr.error("error fetching data",'dashboard')
      console.error('nothing to display');}
    )

  }

  logout() {
    this.toastr.success('logged out successfully','dashboard')
    this.auth.logout();
  }

  

  


}
