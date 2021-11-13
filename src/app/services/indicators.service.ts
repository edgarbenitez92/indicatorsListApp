import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  private baseUrl: string = 'https://mindicador.cl/api';

  constructor(private http: HttpClient) {}

  getIndicators(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getIndicatorValues(code: string): Observable<any> {
    return this.http.get(`https://mindicador.cl/api/${code}`);
  }
}
