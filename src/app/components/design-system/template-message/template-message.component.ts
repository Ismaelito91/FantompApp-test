import { Component, inject, input } from '@angular/core';
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ButtonComponent } from "../button/button.component";
import { UtilsService } from '../../../service/utils.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
   private readonly snackBar = inject(MatSnackBar);
   private translateService = inject(TranslateService);

   data = input.required<PageComponentModel>();

   async copy() {
      try {
         if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(this.utilsService.htmlToTextViaElement(this.pageTranslationPipe.transform(this.data())?.description!));

            this.snackBar.open(this.translateService.instant('COMMON.COPIED'), this.translateService.instant('COMMON.CLOSE'), {
               duration: 1000, // durée en ms
               horizontalPosition: 'center',
               verticalPosition: 'bottom',
               panelClass: 'snackbar-neutral'
            });
         }
      } catch (err) {
         console.error("Erreur lors de la copie:", err);
      }
   }
}
