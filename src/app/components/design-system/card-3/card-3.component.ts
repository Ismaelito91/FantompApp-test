import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';

@Component({
   selector: 'app-card-3',
   imports: [],
   templateUrl: './card-3.component.html',
   styleUrl: './card-3.component.scss'
})
export class Card3Component {
   data = input.required<PageComponentModel>();

}
