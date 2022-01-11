import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CreateListComponent } from '../create-list/create-list.component';
import { List, Task } from 'src/app/shared/task';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  current_date = new Date();
  lists: List[] = [];
  tasks: Task[] = [];
  todaysTask: Task[] = [];
  countTodaysTask: number = 0;
  countUpcomingTask: number = 0;
  countOverdueTask: number = 0;
  taskFormatData: string;
  today: any = Date.now();
  isLoading: boolean = false;
  test: Task;


  constructor(public matdialog: MatDialog, private service: TaskService, private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getTasks().subscribe((data) => this.tasks = data);
    this.service.getList().subscribe((data) => (this.lists = data));
    this.getCounts();
    this.getTodaysTask();
    console.log(this.lists);
  }

  openAddTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-task";
    dialogConfig.height = "425px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(AddTaskComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      console.log(result)
      this.service.addTask(result).subscribe((task: Task) => {
        this.tasks.push(task);
        this.service.getTasks().subscribe((tasks) => this.tasks = tasks);
        this.toastr.success("task added successfully", "Success")
      }
      )
    })
  }

  openAddList() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "create-list";
    dialogConfig.height = "304px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(CreateListComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      console.log(result);
      this.service.addList(result).subscribe((list: List) => this.lists.push(list));
    });
  }




  getCounts() {
    this.service.getTasks().subscribe((res) => {
      this.tasks = res;
      for (let task of this.tasks) {
        console.log(task.task)
        this.taskFormatData = formatDate(task.date, 'YYYY-MM-dd', 'en');
        this.today = formatDate(this.today, 'YYYY-MM-dd', 'en');
        console.log(this.taskFormatData)
        console.log(this.today)
        if (this.taskFormatData == this.today) {
          this.countTodaysTask++
        }
        if (this.taskFormatData > this.today) {
          this.countUpcomingTask++
        }
        if (this.taskFormatData < this.today) {
          this.countOverdueTask++
        }
      }
    })


  }

  getTodaysTask() {
    this.service.getTasks().subscribe((res) => {
      this.tasks = res;
      for (let task of this.tasks) {
        this.taskFormatData = formatDate(task.date, 'YYYY-MM-dd', 'en');
        this.today = formatDate(this.today, 'YYYY-MM-dd', 'en');
        console.log(this.taskFormatData)
        console.log(this.today)
        if (this.taskFormatData == this.today) {
          this.todaysTask.push(task)
        }

      }
    })
  }



  // getTasks(){
  //   this.isLoading = true;
  //   this.service.getTasks().subscribe(res => {
  //     this.tasks = res;
  //     console.log(res)
  //     for (let task of this.tasks){
  //       this.taskFormatData = formatDate(task.date, 'YYYY-MM-dd', 'en');
  //       this.today = formatDate(this.today, 'YYYY-MM-dd','en');
  //       console.log(this.taskFormatData)
  //       console.log(this.today)
  //       if(this.taskFormatData == this.today){
  //         console.log(this.counttodaytask)
  //         this.counttodaytask++;
  //         this.isLoading = false;
  //       }
  //       if(this.taskFormatData > this.today){
  //         this.countupcomingtask++;
  //         this.isLoading = false;
  //       }
  //       if(this.taskFormatData < this.today){
  //         this.countoverduetask++;
  //         this.isLoading = false;
  //       }
  //       if(this.taskFormatData == this.today){
  //         this.todaysTask.push(task);
  //         this.isLoading = false;

  //       }
  //     }
  //     this.isLoading = false;
  //     console.log('todays-task',this.todaysTask)
  //   },
  //   err=> {
  //     this.isLoading = false;
  //     this.toastr.error("error fetching data",'dashboard')
  //     console.error('nothing to display');}
  //   )

  // }

  logout() {
    this.toastr.success('logged out successfully', 'dashboard')
    this.auth.logout();
  }






}
