import { Component, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card-4',
  imports: [SafeHtmlPipe, PageTranslationPipe, TranslatePipe],
  templateUrl: './card-4.component.html',
  styleUrl: './card-4.component.scss'
})
export class Card4Component {
   data = input.required<PageComponentModel>();

}
