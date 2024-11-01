import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Generic } from '../models/generic';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {



  constructor(private http: HttpClient) {
   
  }

  addUnit(unit: { name: string | null; model: string | null; serial: string | null; company: string | null; simcard: string | null; hostid: string | null; }): Observable<Generic> {
    return this.http.post<Generic>('https://gms.pesatto.com/units', unit)
  }

  getUnits(): Observable<Generic> {
    return this.http.get<Generic>('https://gms.pesatto.com/units')
  }

  getHistoric(code: string): Observable<Generic> {
    return this.http.get<Generic>('https://gms.pesatto.com/units/historic/' + code)
  }

  getUnit(unitId: string): Observable<Generic> {
    return this.http.get<Generic>('https://gms.pesatto.com/units/' + unitId)
  }
  sendCommand(data: { units: string, creator: string, code: string, command: string, hostid: string }): Observable<Generic> {
    return this.http.post<Generic>('https://gms.pesatto.com/units/command/set', data)
  }
}
