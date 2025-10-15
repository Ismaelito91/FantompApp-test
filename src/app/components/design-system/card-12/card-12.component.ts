import { Component, inject, input } from '@angular/core';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ReplaceStringDarkPipe } from '../../../pipes/replace-string-dark.pipe';

@Component({
   selector: 'app-card-12',
   imports: [PageTranslationPipe, SafeHtmlPipe, TranslatePipe, TranslatePipe, ReplaceStringDarkPipe],
   templateUrl: './card-12.component.html',
   styleUrl: './card-12.component.scss'
})
export class Card12Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
