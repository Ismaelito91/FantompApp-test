import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';

@Component({
  selector: 'app-card-4',
  imports: [],
  templateUrl: './card-4.component.html',
  styleUrl: './card-4.component.scss'
})
export class Card4Component {
   data = input.required<PageComponentModel>();

}
