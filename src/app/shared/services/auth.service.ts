import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { Register } from '../user';

let registerData = {};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  private testSubject: Subject<Task>;
  userData : any;

  constructor(private http: HttpClient, private router: Router) {
    this.testSubject = new Subject<Task>();
  }

  private _url = 'https://61c007e6b25c3a00173f4ffe.mockapi.io/signup-users';

  testmethod(data: any): void {
    this.testSubject.next(data);
  }
  ontestmethod(): Observable<Task> {
    return this.testSubject;
  }


  getUsers(): Observable<Register[]> {
    return this.http.get<Register[]>(this._url);
  }

  gettoken() {
    return !!localStorage.getItem('SessionUser');
  }

  postregisterData(user: Register): Observable<any> {
    let returnValue = this.http.post<any>(this._url, user, httpOptions);
    return returnValue;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this._url, {
      username: username,
      password: password,
    });
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('SessionUser');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isSignedin(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
