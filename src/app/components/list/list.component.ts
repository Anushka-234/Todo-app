import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list: string;
  collapsed: boolean = true;
  items: any;
  tasks: any[];
  isLoading: boolean = false;

  constructor(private service: TaskService,
    private toastr: ToastrService,
    public matdialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasksofList(this.list);
  }

  getTasksofList(listname: string): void {
    this.service.getTasks().subscribe(
      res => {
        this.tasks = res;
        this.tasks = this.tasks.filter((task: any) => task.list == this.list)
      });
  }

  // deleteTask(task: any): void {
  //   this.isLoading = true;
  //   this.service
  //     .deleteTask(task)
  //     .subscribe(
  //       () => {
  //         (this.tasks = this.tasks.filter((t) => t.id !== task.id))
  //         this.isLoading = false;
  //         this.toastr.success('Task deleted');
  //       });
  // }
  deleteTask(task: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "confirm-deleted";
    dialogConfig.height = "240px";
    dialogConfig.width = "550px";
    const modalDialog = this.matdialog.open(ConfirmDeleteComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteTask(task).subscribe(() => {
          (this.tasks = this.tasks.filter((t: any) => t.id !== task.id))
          this.service.getTasks();
          this.toastr.success('Task deleted')
        });
      }
    })
  }
}
