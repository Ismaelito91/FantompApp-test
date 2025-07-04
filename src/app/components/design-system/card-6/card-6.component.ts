import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';

@Component({
  selector: 'app-card-6',
  imports: [],
  templateUrl: './card-6.component.html',
  styleUrl: './card-6.component.scss'
})
export class Card6Component {
   data = input.required<PageComponentModel>();

}
