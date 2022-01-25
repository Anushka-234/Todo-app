import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
  @Input() todaysTask: any;
  isLoading: boolean = false;
  flag: boolean = false;
  index: number = 0;
  constructor(
    private service: TaskService,
    private toastr: ToastrService,
    private matdialog: MatDialog) { }

  ngOnInit(): void {
  }

  deleteTask(task: any, i): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "confirm-deleted";
    dialogConfig.height = "240px";
    dialogConfig.width = "550px";
    const modalDialog = this.matdialog.open(ConfirmDeleteComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.flag = true;
        this.index = i;
        this.isLoading = true;
        this.service.deleteTask(task).subscribe(() => {
          (this.todaysTask = this.todaysTask.filter((t: any) => t.id !== task.id))
          this.service.getTasks();
          this.isLoading = false;
          this.toastr.success('Task deleted')
        });
      }
    })
  }
} 
