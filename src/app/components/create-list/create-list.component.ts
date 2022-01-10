import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  lists:any[]= [];

  constructor(public dialogRef: MatDialogRef<CreateListComponent>,private fb:FormBuilder, private service: TaskService) { }

  ngOnInit(): void {
  }
  addlist= this.fb.group({
    list:['',Validators.required]
  })

  // addList(){
  //   if(this.addlist.valid){
  //     const task = this.addlist.value;
  //     this.dialogRef.close();
  //     console.log(task)
  //   }else{
  //     alert("Invalid form")
  //   }
  // }

  addList(){
    const list = this.addlist.value;
    this.dialogRef.close(list)
  }

  closeAddList(){
    this.dialogRef.close();
  }

}
