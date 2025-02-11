import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../entities/stock';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _stocks: BehaviorSubject<Array<Stock>> = new BehaviorSubject(Array());

  public readonly todos: Observable<Stock[]> = this._stocks.asObservable();

constructor() { }

  setStockValue(stocks: Stock[]) {
    this._stocks.next(stocks);
  }

  upsertStockValue(stocks: Stock[]) {
    this._stocks.next(stocks);
  }
}
