import { Component, inject, input } from '@angular/core';
import { Card8Component } from "../card-8/card-8.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import PageComponentModel from '../../../model/page-component.model';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ComponentType } from '../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { TranslatePipe } from '@ngx-translate/core';
import { ReplaceStringDarkPipe } from '../../../pipes/replace-string-dark.pipe';
import { UtilsService } from '../../../service/utils.service';
import { NgClass } from '@angular/common';
@Component({
   selector: 'app-card-7',
   imports: [Card8Component, MatIconModule, RouterLink, SafeHtmlPipe, PageTranslationPipe, TranslatePipe, ReplaceStringDarkPipe, NgClass],
   templateUrl: './card-7.component.html',
   styleUrl: './card-7.component.scss'
})
export class Card7Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   public utilsService = inject(UtilsService);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
