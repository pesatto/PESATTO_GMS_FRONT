import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Generic } from '../models/generic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  token = ""
  constructor(private http: HttpClient) {
     
   }

  getCompanies(): Observable<Generic> {
    return this.http.get<Generic>('https://gms.pesatto.com/users/company')
  }

  addCompany(data: {name: string, rfc: string}): Observable<Generic> {
    return this.http.post<Generic>('https://gms.pesatto.com/users/company', data)
  }
}
