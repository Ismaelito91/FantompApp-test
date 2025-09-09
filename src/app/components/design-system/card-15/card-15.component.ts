import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { EnrichedLinkComponent } from "../enriched-link/enriched-link.component";
import { TileCallComponent } from "../tile-call/tile-call.component";
import { TileMessageComponent } from "../tile-message/tile-message.component";
import { ButtonComponent } from "../button/button.component";
import { TileMailComponent } from "../tile-mail/tile-mail.component";

@Component({
   selector: 'app-card-15',
   imports: [PageTranslationPipe, SafeHtmlPipe, EnrichedLinkComponent, TileCallComponent, TileMessageComponent, ButtonComponent, TileMailComponent],
   templateUrl: './card-15.component.html',
   styleUrl: './card-15.component.scss'
})
export class Card15Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
