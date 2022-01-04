import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  lists:any[]= [];
  tasks:any[]=[];

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,private fb:FormBuilder, private service:TaskService ) { }

  ngOnInit(): void {
    this.service.getList().subscribe((data) => (this.lists = data));
    console.log(this.lists);
  }
  

  closeAddTask(){
    this.dialogRef.close()
  }

  addtask = this.fb.group({
    task:['',Validators.required],
    list:['',Validators.required],
    priority:['',Validators.required],
    date:['', Validators.required]
  })

  addTask(){
    const task = this.addtask.value;
    this.service.addTask(task).subscribe((task) => this.tasks.push(task));
    this.dialogRef.close()
  }
  

}
