import { Component, input, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Elem } from '../../../entities/element'
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-element-card',
  imports: [TagModule, CardModule],
  templateUrl: './element-card.component.html',
  styleUrl: './element-card.component.css'
})
export class ElementCardComponent implements OnInit {
  e = input<Elem>({} as Elem);
  elem!: Elem;
  idStr!: string;
  ngOnInit() {
    this.elem = this.e();
    this.idStr = this.elem.id.toString()
  }
  
}
