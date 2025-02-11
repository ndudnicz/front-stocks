import { Component, input, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Stock } from '../../../entities/stock'
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-element-card',
  imports: [TagModule, CardModule],
  templateUrl: './element-card.component.html',
  styleUrl: './element-card.component.css'
})
export class ElementCardComponent implements OnInit {
  e = input<Stock>({} as Stock);
  elem!: Stock;
  lastPriceStr = '';
  variationStr = '';
  ngOnInit() {
    this.elem = this.e();
    this.lastPriceStr = this.elem.lastPrice.toString();
    this.variationStr = `${this.elem.variation >= 0 ? '+' : ''}${this.elem.variation.toString()}%`;
  }
  
}
