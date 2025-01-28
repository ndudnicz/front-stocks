import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElementService } from '../../services/element.service';
import { Elem } from '../../entities/element';
import { ElementCardComponent } from './element-card/element-card.component';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'app-home',
    imports: [
      RouterModule,
      ElementCardComponent,
      DividerModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private elementService: ElementService) {}

  elements: Elem[] = []
  columns : any = {
    'todo': [],
    'doing': [],
    'done': []
  }

  async ngOnInit() {
    this.elements = await this.elementService.get();
    this.elements.forEach((e) => {
      this.columns[e.status].push(e);
    })
  }
}
