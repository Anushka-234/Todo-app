import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-listnames',
  templateUrl: './listnames.component.html',
  styleUrls: ['./listnames.component.scss']
})
export class ListnamesComponent implements OnInit {
  @Input() list: string;
  collapsed: boolean = true;
  items: any;
  tasks: any[];
  isLoading: boolean = false;

  constructor(private service: TaskService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTasksofList(this.list);
  }


  getTasksofList(listname: string) {
    this.service.getTasks().subscribe(
      res => {
        this.tasks = res;
        this.tasks = this.tasks.filter((task: any) => task.list == this.list)
      })
  }

  deleteTask(task: any) {
    this.isLoading = true;
    this.service
      .deleteTask(task)
      .subscribe(
        () => {
          (this.tasks = this.tasks.filter((t) => t.id !== task.id))
          this.isLoading = false;
          this.toastr.success('Task deleted');
        });
  }

}
