import { Component, inject, input } from '@angular/core';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { TagUnclickableComponent } from "../tag-unclickable/tag-unclickable.component";
import { Card17Component } from "../card-17/card-17.component";
import { TagUnclickableVariant } from '../../../model/type/tag-unclickable-variant.type';

@Component({
   selector: 'app-card-16',
   imports: [PageTranslationPipe, SafeHtmlPipe, TagUnclickableComponent, Card17Component],
   templateUrl: './card-16.component.html',
   styleUrl: './card-16.component.scss'
})
export class Card16Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }

   toVariant(value: string | undefined): TagUnclickableVariant {
      switch (value) {
         case 'primary': return 'primary';
         case 'secondary': return 'secondary';
         case 'danger': return 'danger';
         default: return 'primary';
      }
   }
}
