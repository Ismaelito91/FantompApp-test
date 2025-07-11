import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { RouterLink } from '@angular/router';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-card-8',
   imports: [MatIconModule, SafeHtmlPipe, RouterLink, PageTranslationPipe],
   templateUrl: './card-8.component.html',
   styleUrl: './card-8.component.scss'
})
export class Card8Component {
   data = input.required<PageComponentModel>();

}
