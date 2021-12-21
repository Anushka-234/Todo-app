import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../user';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private _url = "https://61c007e6b25c3a00173f4ffe.mockapi.io/signup-users"

  getUsers():Observable<Register[]>{
    return this.http.get<Register[]>(this._url)
  }

  registerUser(user:Register):Observable<Register>{
    return this.http.post<Register>(this._url, user, httpOptions)
  }
}
