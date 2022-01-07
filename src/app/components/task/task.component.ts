import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
 @Input() todaysTask:any;
 isLoading:boolean = false;
  constructor(private service : TaskService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  deleteTask(task:any){
    this.isLoading = true;
    this.service
    .deleteTask(task)
    .subscribe(
      () => {(this.todaysTask = this.todaysTask.filter((t:any) => t.id !== task.id))
      this.isLoading = false
      this.toastr.warning('Task deleted')
      }
    );
  }

}
