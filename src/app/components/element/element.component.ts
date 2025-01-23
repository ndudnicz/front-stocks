import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-element',
    imports: [],
    templateUrl: './element.component.html',
    styleUrl: './element.component.css'
})
export class ElementComponent {
  id!: any;
  constructor(  private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
