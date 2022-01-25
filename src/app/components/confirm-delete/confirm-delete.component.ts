import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  ngOnInit(): void {
  }

  delete() {
    const test = "deleted"
    this.dialogRef.close(test);
  }

  closeConfirmDelete() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
