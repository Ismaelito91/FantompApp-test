import { Component, inject, input } from '@angular/core';
import { TranslatePipe } from "@ngx-translate/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ButtonComponent } from "../button/button.component";
import { UtilsService } from '../../../service/utils.service';

@Component({
   selector: 'app-template-message',
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      ButtonComponent,
      TranslatePipe
   ],
   templateUrl: './template-message.component.html',
   styleUrl: './template-message.component.scss'
})
export class TemplateMessageComponent {
   private readonly pageTranslationPipe = inject(PageTranslationPipe);
   private readonly utilsService = inject(UtilsService);
   data = input.required<PageComponentModel>();

   async copy() {
      try {
         if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(this.utilsService.htmlToTextViaElement(this.pageTranslationPipe.transform(this.data())?.description!));
         }
      } catch (err) {
         console.error("Erreur lors de la copie:", err);
      }
   }
}
