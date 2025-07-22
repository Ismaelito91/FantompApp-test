import { Component, inject, input } from '@angular/core';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { EnrichedLinkComponent } from "../enriched-link/enriched-link.component";
import { TileCallComponent } from "../tile-call/tile-call.component";
import { TileMessageComponent } from "../tile-message/tile-message.component";
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-card-5',
   imports: [TileCallComponent, TileMessageComponent, EnrichedLinkComponent, SafeHtmlPipe, PageTranslationPipe],
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
