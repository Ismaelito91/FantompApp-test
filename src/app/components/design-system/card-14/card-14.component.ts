import { Component, inject, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { Card15Component } from "../card-15/card-15.component";
import { ComponentType } from '../../../model/enum/component-type.enum';

@Component({
  selector: 'app-card-14',
  imports: [PageTranslationPipe, SafeHtmlPipe, Card15Component],
  templateUrl: './card-14.component.html',
  styleUrl: './card-14.component.scss'
})
export class Card14Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
