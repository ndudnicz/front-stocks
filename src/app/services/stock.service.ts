import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../entities/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUri = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  get(): Promise<Stock[]> {
    return new Promise<Stock[]>((resolve, reject) => {
      this.http.get(`${this.baseUri}/v1/stock`).subscribe({
        next: (data: any) => {
          resolve(data);
        },
        error: (e) => {
          reject(e);
        }
      });
    })
  }
}