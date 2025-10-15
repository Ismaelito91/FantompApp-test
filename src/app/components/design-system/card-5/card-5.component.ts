import { Component, inject, input } from '@angular/core';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { EnrichedLinkComponent } from "../enriched-link/enriched-link.component";
import { TileCallComponent } from "../tile-call/tile-call.component";
import { TileMessageComponent } from "../tile-message/tile-message.component";
import { TranslatePipe } from '@ngx-translate/core';
import { Card13Component } from "../card-13/card-13.component";
import { ReplaceStringDarkPipe } from '../../../pipes/replace-string-dark.pipe';
@Component({
   selector: 'app-card-5',
   imports: [TileCallComponent, TileMessageComponent, EnrichedLinkComponent, SafeHtmlPipe, PageTranslationPipe, TranslatePipe, Card13Component, ReplaceStringDarkPipe],
   templateUrl: './card-5.component.html',
   styleUrl: './card-5.component.scss'
})
export class Card5Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
