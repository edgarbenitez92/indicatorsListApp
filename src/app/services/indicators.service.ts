import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Indicator } from '../interfaces/indicator.interface';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  private baseUrl: string = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) {}

  getIndicators(): Observable<Indicator[]> {
    return this.http.get<Indicator[]>(this.baseUrl);
  }

  getIndicatorValues(code: string): Observable<any> {
    return this.http.get(`https://mindicador.cl/api/${code}`);
  }

  getIndicatorByYear(code: string, year: string): Observable<any> {
    const yearUrl = `${this.baseUrl}/${code}/${year}`;
    return this.http.get(yearUrl);
  }

  getIndicatorByDate(code: string, date: string): Observable<any> {
    const dateUrl = `${this.baseUrl}/${code}/${date}`;
    return this.http.get(dateUrl);
  }
}
