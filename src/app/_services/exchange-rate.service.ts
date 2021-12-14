import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExchangeRate } from '../_models/exchangeRate';
import { ExchangeRateOperationResquest } from '../_models/exchangeRateOperationRequest';
import { ExchangeRateOperationResponse } from '../_models/exchangeRateOperationResponse';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  myAppUrl = 'http://localhost:8080';
  myApiUrl = '/api/v1/exchangerate';
  list?: ExchangeRate[];
  private updateForm = new BehaviorSubject<ExchangeRate>({} as any);
  constructor(private http: HttpClient) {}

  saveExchangeRate(exchangeRate: ExchangeRate): Observable<ExchangeRate> {
    return this.http.post<ExchangeRate>(
      this.myAppUrl + this.myApiUrl,
      exchangeRate
    );
  }

  operationExchangeRate(
    exchangeRateOperationResquest: ExchangeRateOperationResquest
  ): Observable<ExchangeRateOperationResponse> {
    return this.http.post<ExchangeRateOperationResponse>(
      this.myAppUrl + this.myApiUrl + '/operation',
      exchangeRateOperationResquest
    );
  }

  getAllExchangeRates() {
    return this.http
      .get(this.myAppUrl + this.myApiUrl)
      .toPromise()
      .then((data) => {
        this.list = data as ExchangeRate[];
      });
  }

  deleteExchangeRate(id: number): Observable<ExchangeRate> {
    console.log(id);
    return this.http.delete<ExchangeRate>(
      this.myAppUrl + this.myApiUrl + '/' + id
    );
  }

  retrieveExchangeRate(exchangeRate: ExchangeRate) {
    this.updateForm.next(exchangeRate);
  }

  getExchangeRate(): Observable<ExchangeRate> {
    return this.updateForm.asObservable();
  }

  updateExchangeRate(
    id: number,
    exchangeRate: ExchangeRate
  ): Observable<ExchangeRate> {
    return this.http.put<ExchangeRate>(
      this.myAppUrl + this.myApiUrl + '/' + id,
      exchangeRate
    );
  }
}
