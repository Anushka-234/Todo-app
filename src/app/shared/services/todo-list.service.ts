import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoListService {


  private _url = "https://61c007e6b25c3a00173f4ffe.mockapi.io/todos"

  constructor(private http: HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this._url);
  }

  addTodos(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this._url, todo, httpOptions)
  }

  deleteTodos(todo:Todo):Observable<Todo>{
    const url = `${this._url}/${todo.id}`;
    return this.http.delete<Todo>(url);
   }

   toggleTodo(todo : Todo):Observable<Todo>{
    const url = `${this._url}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions);
   }
}
