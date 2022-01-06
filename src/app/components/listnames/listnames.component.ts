import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-listnames',
  templateUrl: './listnames.component.html',
  styleUrls: ['./listnames.component.scss']
})
export class ListnamesComponent implements OnInit {
  @Input() list:string;
  collapsed : boolean = true;
  items:any;
  tasks:any[];

  constructor(private service:TaskService) { }

  ngOnInit(): void {
    this.getTasksofList(this.list);
  }


  getTasksofList(listname : string){
    this.service.getTasks().subscribe(
      res => {
        this.tasks = res;
        this.tasks = this.tasks.filter((task:any) => task.list == this.list)
      }

    )

  }

deleteTask(task:any){
  this.service
  .deleteTask(task)
  .subscribe(
    () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
  );
}

}
