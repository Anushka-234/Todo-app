import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.scss']
})
export class ConfirmLogoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmLogoutComponent>) { }

  ngOnInit(): void {
  }

  logout() {
    const test = "deleted"
    this.dialogRef.close(test);
  }

  cancelLogout() {
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
