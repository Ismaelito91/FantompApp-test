import { Component, inject, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ReplaceStringDarkPipe } from '../../../pipes/replace-string-dark.pipe';

@Component({
   selector: 'app-card-13',
   imports: [PageTranslationPipe, SafeHtmlPipe, TranslatePipe, ReplaceStringDarkPipe],
   templateUrl: './card-13.component.html',
   styleUrl: './card-13.component.scss'
})
export class Card13Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
