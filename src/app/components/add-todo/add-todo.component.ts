import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../shared/todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  title: string;
  day: string;
  priority:string;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    const todo = {
      sno: 8,
      title: this.title,
      day: this.day,
      priority:this.priority
    };
    console.log(todo)
    this.todoAdd.emit(todo);

    this.title = '';
    this.day = '';
    this.priority = '';
  }
}
