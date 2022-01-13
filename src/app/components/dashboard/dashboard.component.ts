import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CreateListComponent } from '../create-list/create-list.component';
import { List, Task } from 'src/app/shared/task';
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
  lists: List[] = [];
  tasks: Task[] = [];
  todaysTask: Task[] = [];
  countTodaysTask: number = 0;
  countUpcomingTask: number = 0;
  countOverdueTask: number = 0;
  taskFormatData: string;
  today: any = Date.now();
  isLoading: boolean = false;


  constructor(
    public matdialog: MatDialog,
    private service: TaskService,
    private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getList().subscribe((data) => (this.lists = data));
    this.getTasks();
  }

  openAddTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "add-task";
    dialogConfig.height = "425px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(AddTaskComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.addTask(result).subscribe((data) => {
          this.service.getTasks();
          this.isLoading = true;
          this.taskFormatData = formatDate(data.date, 'YYYY-MM-dd', 'en');
          this.today = formatDate(this.today, 'YYYY-MM-dd', 'en');
          if (this.taskFormatData == this.today) {
            this.todaysTask.push(data);
            this.countTodaysTask++
            this.isLoading = false;
            this.toastr.success("task added successfully", "Success")
          } else if (this.taskFormatData > this.today) {
            this.countUpcomingTask++;
          } else if (this.taskFormatData < this.today) {
            this.countOverdueTask++;
          }
        }, err => {
          this.toastr.error("something went wrong", "error");
        });
      }
    }, err => {
      this.toastr.error("something went wrong", "error");
    });
  }

  openAddList() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "create-list";
    dialogConfig.height = "304px";
    dialogConfig.width = "768px";
    const modalDialog = this.matdialog.open(CreateListComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.addList(result).subscribe((list: List) => {
          this.lists.push(list)
          this.toastr.success("List added", "Success");
        });
      } else {
        this.toastr.error("List not added", "Invalid Form");
      }
    });
  }


  getTasks() {
    this.isLoading = true;
    this.service.getTasks().subscribe(res => {
      this.tasks = res;
      for (let task of this.tasks) {
        this.taskFormatData = formatDate(task.date, 'YYYY-MM-dd', 'en');
        this.today = formatDate(this.today, 'YYYY-MM-dd', 'en');
        if (this.taskFormatData == this.today) {
          console.log(this.countTodaysTask)
          this.countTodaysTask++;
          this.isLoading = false;
        }
        if (this.taskFormatData > this.today) {
          this.countUpcomingTask++;
          this.isLoading = false;
        }
        if (this.taskFormatData < this.today) {
          this.countOverdueTask++;
          this.isLoading = false;
        }
        if (this.taskFormatData == this.today) {
          this.todaysTask.push(task);
          this.isLoading = false;

        }
      }
      this.isLoading = false;
    },
      err => {
        this.isLoading = false;
        this.toastr.error("error fetching data", 'dashboard');
      }
    )
  }

  logout() {
    this.toastr.success('logged out successfully', 'dashboard')
    this.auth.logout();
  }

}
