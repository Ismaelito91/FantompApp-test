import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-card-11',
   imports: [PageTranslationPipe],
   templateUrl: './card-11.component.html',
   styleUrl: './card-11.component.scss'
})
export class Card11Component {
   data = input.required<PageComponentModel>();
   index = input.required<number>();

}
