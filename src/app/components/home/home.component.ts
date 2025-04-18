import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../entities/stock';
import { ElementCardComponent } from './element-card/element-card.component';
import { DividerModule } from 'primeng/divider';
import { SignalRService } from '../../services/signalr.service';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    RouterModule,
    ElementCardComponent,
    DividerModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private stockService: StockService,
    private signalrService: SignalRService,
    private dataService: DataService
  ) { }

  stocks: Stock[] = [];
  falls: Stock[] = [];
  rises: Stock[] = [];
  lastUpdated = '/';

  private stockSubscription!: Subscription;

  async ngOnInit() {
    this.stocks = await this.stockService.get();
    this.sortData();
    this.signalrService.startConnection();
    this.stockSubscription = this.dataService.todos.subscribe((value: Stock[]) => {
      console.log('new value received', value, 'current stocks', this.stocks);
      if (value.length > 0) {
        this.stocks = value;
        this.lastUpdated = new Date().toISOString();
        this.sortData();
      }
    });
  }

  ngOnDestroy(): void {
    this.signalrService.stopConnection();
    this.stockSubscription.unsubscribe();
  }

  sortData() {
    console.log('sortData', this.stocks);
    this.rises = [];
    this.falls = [];
    this.stocks.forEach((e: Stock) => {
      if (e.variation < 0) {
        this.falls.push(e);
      } else {
        this.rises.push(e);
      }
    });
    this.rises.sort((a: Stock, b: Stock) => b.variation - a.variation);
    this.falls.sort((a: Stock, b: Stock) => a.variation - b.variation);
    console.log('rises', this.rises, 'falls', this.falls);
  }
}
