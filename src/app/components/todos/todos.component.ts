import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  localItem: any;
  todos: Todo[];

  constructor() {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(this.localItem);
    }
  }

  ngOnInit() {}

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    console.log(todo);
  }
  AddTodo(todo: Todo): Todo{
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    console.log(todo);
    return todo;
  }
  toggleTodo(todo: Todo){
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem('todos', JSON.stringify(this.todos));
    console.log(todo);
  }
}
