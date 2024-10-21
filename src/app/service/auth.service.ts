import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthGeneric, User } from '../models/user';
import { map, Observable, Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private httpClient: HttpClient, private router: Router) { }

  public authLogin(email: string, password: string): Observable<any> {

    return this.httpClient.post<AuthGeneric>("https://gms.pesatto.com/users/auth", { email, password }).pipe(map(data => {
      if (data.error) {
        return { error: true, message: data.message }
      } else {
        localStorage.setItem("PESUS", JSON.stringify(data.data))
        localStorage.setItem("PESTOK", data.token)

        return { error: false }
      }

    }))

  }

  public get_token(): string {
    return localStorage.getItem("PESTOK")!
  }

  public get_user(): User {
    return JSON.parse(localStorage.getItem("PESUS")!)
  }

  public logout() {
    localStorage.removeItem("PESUS")
    localStorage.removeItem("PESTOK")
    this.router.navigate(["/auth/login"])
  }

  public getUserType(): number {
    return this.get_user().user_type
  }

  isAuthenticated(): boolean {
    const token = this.get_token();
    if (token && localStorage.getItem("PESUS")) {
      return !this.jwtHelper.isTokenExpired(token) 
    } else {
      return false
    }
  }

}
