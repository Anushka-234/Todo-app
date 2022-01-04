import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  current_date = new Date();

  constructor(public matdialog: MatDialog) { }

  ngOnInit(): void {
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

}
