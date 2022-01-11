import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';
import { List } from 'src/app/shared/task';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  lists: List[] = [];
  addListForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateListComponent>,
    private fb: FormBuilder,
    private service: TaskService) { }

  ngOnInit(): void {
    this.addListForm = this.fb.group({
      list: ['', Validators.required]
    })
  
  }

  addList() {
    const list = this.addListForm.value;
    this.dialogRef.close(list)
  }

  closeAddList() {
    this.dialogRef.close();
  }

}
