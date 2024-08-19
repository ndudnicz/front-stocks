import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElementService } from '../../services/element.service';
import { Element } from '../../entities/element';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private elementService: ElementService) {}

  elements: Element[] = []

  async ngOnInit() {
    this.elements = await this.elementService.get();
  }
}
