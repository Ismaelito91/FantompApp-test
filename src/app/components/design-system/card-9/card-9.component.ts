import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Card10Component } from "../card-10/card-10.component";
import PageComponentModel from '../../../model/page-component.model';

@Component({
   selector: 'app-card-9',
   imports: [MatIconModule, Card10Component],
   templateUrl: './card-9.component.html',
   styleUrl: './card-9.component.scss'
})
export class Card9Component {
   data = input.required<PageComponentModel>();

   get sortedChildren() {
      const children = this.data()?.children ?? [];
      return [...children].sort((a, b) => a.position! - b.position!);
   }
}
