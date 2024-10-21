import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Generic } from '../models/generic';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private http: HttpClient) {
   
  }

  addUser(user: { fullname: string | null; email: string | null; user_type: string | null; userpassword: string | null; company: string | null; }): Observable<Generic> {
    return this.http.post<Generic>('https://gms.pesatto.com/users', user)
  }

  getUsers(): Observable<Generic> {
    return this.http.get<Generic>('https://gms.pesatto.com/users')
  }
}
