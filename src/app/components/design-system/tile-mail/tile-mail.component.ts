import { Component, inject, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from "../button/button.component";

@Component({
   selector: 'app-tile-mail',
   imports: [PageTranslationPipe, SafeHtmlPipe, MatIconModule, ButtonComponent],
   templateUrl: './tile-mail.component.html',
   styleUrl: './tile-mail.component.scss'
})
export class TileMailComponent {
   private readonly pageTranslationPipe = inject(PageTranslationPipe);
   data = input.required<PageComponentModel>();
   showCopyNotification = false;

   async copy() {
      try {
         if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(this.pageTranslationPipe.transform(this.data())?.secondTitle!);
            this.showCopyNotification = true;

            setTimeout(() => {
               this.showCopyNotification = false;
            }, 2000);
         }
      } catch (err) {
         console.error("Erreur lors de la copie:", err);
      }
   }
}
