import { Component, OnInit,Output,EventEmitter} from '@angular/core';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
	
	title: string;
	day: string;
  active:boolean=false;
    @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
  	const todo = {
  	 sno : 8,
  	 title : this.title,
  	 day : this.day,
  	 active : true
  	}
  	this.todoAdd.emit(todo);

    this.title="";
    this.day = "";
    this.active = false;
  }

}