import { Component, input } from '@angular/core';
import { Card8Component } from "../card-8/card-8.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ComponentType } from '../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-card-7',
   imports: [Card8Component, MatIconModule, RouterLink, SafeHtmlPipe, PageTranslationPipe],
   templateUrl: './card-7.component.html',
   styleUrl: './card-7.component.scss'
})
export class Card7Component {
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   get sortedChildren() {
      const children = this.data()?.children ?? [];
      return [...children].sort((a, b) => a.position! - b.position!);
   }
}
