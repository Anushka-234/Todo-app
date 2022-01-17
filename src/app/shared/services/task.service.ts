import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, map } from 'rxjs';
import { Task } from '../task';
import { Subscription } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks:any[] = [];
  todaystask:any[] = [];
  private subscription : Subscription;
  private testSubject : Subject<Task>;
  private _url = 'https://61c007e6b25c3a00173f4ffe.mockapi.io/lists';
  private task_url = 'https://61c007e6b25c3a00173f4ffe.mockapi.io/tasks';

  constructor(private http: HttpClient) { 
    this.testSubject = new Subject<Task>();
  }


testmethod (task: Task): void {
    this.testSubject.next(task);
}

ontestmethod(): Observable<Task> {
    return this.testSubject;
}

  

  getList(): Observable<any[]> {
    return this.http.get<any[]>(this._url);
  }

  addList(list:any): Observable<any> {
    return this.http.post<any>(this._url, list, httpOptions);
  }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.task_url);
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.task_url, task, httpOptions);
  }
  
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.task_url}/${task.id}`;
    return this.http.delete<Task>(url);
  }



  // getTodaysTask(): Subscription{
  //   let todaysDate = new Date().toDateString();
  //   console.log(todaysDate)
  //   return this.getTasks().subscribe((res) => {
  //     this.tasks = res;
  //     console.log(this.tasks)
  //     this.tasks.filter((task:any) => {
  //       let taskDate = new Date(task.date).toDateString();
  //       console.log(taskDate);
  //       if(todaysDate == taskDate){
  //        return task;
  //       }
  //     })
  //   })
  // }




}
