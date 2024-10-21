import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) {
     
   }

  getModels(): Observable<Generic> {
    return this.http.get<Generic>('https://gms.pesatto.com/units/models')
  }
}
