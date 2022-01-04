import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,private fb:FormBuilder) { }

  ngOnInit(): void {
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
    if(this.addtask.valid){
      const task = this.addtask.value;
      this.dialogRef.close();
      console.log(task)
    }else{
      alert("Invalid form")
    }
  }

}
