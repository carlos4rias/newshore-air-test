import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseURL = 'https://open.er-api.com/v6/latest/USD';

  constructor(private httpClient: HttpClient) { }

  public getCurrencies(): Observable<Currency>{
    return this.httpClient.get<Currency>(`${this.baseURL}`);
  }

}
