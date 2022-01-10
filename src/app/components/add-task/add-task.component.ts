import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  lists:any[]= [];
  tasks:any[]=[];
  isLoading:boolean = false;

  constructor(public dialogRef: MatDialogRef<AddTaskComponent>,private fb:FormBuilder, 
    private service:TaskService,
    private toastr:ToastrService) { }

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
    this.isLoading = true;
    const task = this.addtask.value;
    // this.service.testmethod(task);
    this.service.addTask(task).subscribe((task) => this.tasks.push(task));
    this.toastr.success('Task added','success')
    this.dialogRef.close(task);
  }

  get addtaskcontrol() {
    return this.addtask.controls;
  }
  

}
