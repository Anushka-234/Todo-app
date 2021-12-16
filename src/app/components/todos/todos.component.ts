import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../../shared/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations : [
    // trigger('fade',[
    //   state('void',style({ opacity:0})),
    //   transition('void <=> *',[
    //     animate(2000)
    //   ])
    // ]),
    trigger('listAnimation',[
      transition('* => *',[
        query(':enter', style({opacity:0}), {optional:true}),

        query(':enter', stagger('300ms',[
          animate('1s ease-in',keyframes([
            style({opacity:0,transform:'translateY(-75px)',offset:0}),
            style({opacity:.5,transform:'translateY(35px)',offset:0.3}),
            style({opacity:1,transform:'translateY(0)',offset:1})
          ]))
        ]),{ optional:true}),

        query(':leave', stagger('300ms',[
          animate('1s ease-in',keyframes([
            style({opacity:0,transform:'translateY(0)',offset:0}),
            style({opacity:.5,transform:'translateY(35px)',offset:0.3}),
            style({opacity:1,transform:'translateY(-75px)',offset:1})
         ]))
         ]),{ optional:true})
      ])
    ])
  ]
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
  // toggleTodo(todo: Todo){
  //   const index = this.todos.indexOf(todo);
  //   this.todos[index].active = !this.todos[index].active;
  //   localStorage.setItem('todos', JSON.stringify(this.todos));
  //   console.log(todo);
  // }

  onToggleTodo(todo: Todo){
    todo.priority = "done"
    localStorage.setItem("todos",JSON.stringify(this.todos))
  }
}
function trasition(): import("@angular/animations").AnimationMetadata {
  throw new Error('Function not implemented.');
}

