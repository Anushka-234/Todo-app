import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckbox: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick(todo: Todo) {
    this.todoDelete.emit(todo);
    console.log('onclick has been triggered.');
  }

  onCheckboxClick(todo: Todo) {
    this.todoCheckbox.emit(todo);
  }
}
