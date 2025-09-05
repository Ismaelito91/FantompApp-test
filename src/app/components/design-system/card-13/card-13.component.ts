import { Component, inject, input } from '@angular/core';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';

@Component({
   selector: 'app-card-13',
   imports: [PageTranslationPipe, SafeHtmlPipe],
   templateUrl: './card-13.component.html',
   styleUrl: './card-13.component.scss'
})
export class Card13Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
