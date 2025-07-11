import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-card-3',
   imports: [SafeHtmlPipe, PageTranslationPipe],
   templateUrl: './card-3.component.html',
   styleUrl: './card-3.component.scss'
})
export class Card3Component {
   data = input.required<PageComponentModel>();

}
