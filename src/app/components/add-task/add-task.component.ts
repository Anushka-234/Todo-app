import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faPoo } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';
import { List } from 'src/app/shared/task';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  isLoading: boolean = false;
  addTaskForm !: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>, private fb: FormBuilder,
    private service: TaskService,
    private toastr: ToastrService) {
    this.addTaskForm = this.fb.group({
      task: ['', Validators.required],
      list: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.service.getList().subscribe((data) => (this.lists = data));
  }

  closeAddTask(): void {
    this.dialogRef.close();
  }

  addTask(): void {
    this.isLoading = true;
    const task = this.addTaskForm.value;
    this.dialogRef.close(task);
  }

  get addTaskControl() {
    return this.addTaskForm.controls;
  }
}
