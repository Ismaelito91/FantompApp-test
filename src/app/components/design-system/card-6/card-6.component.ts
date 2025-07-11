import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
  selector: 'app-card-6',
  imports: [SafeHtmlPipe, PageTranslationPipe],
  templateUrl: './card-6.component.html',
  styleUrl: './card-6.component.scss'
})
export class Card6Component {
   data = input.required<PageComponentModel>();

}
