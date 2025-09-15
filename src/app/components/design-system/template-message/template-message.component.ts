import {Component, computed, inject, input} from '@angular/core';
import {ThemeService} from "../../../service/theme.service";
import PageComponentModel from "../../../model/page-component.model";
import {PageTranslationPipe} from "../../../pipes/page-translation.pipe";
import {SafeHtmlPipe} from "../../../pipes/safe-html.pipe";
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-template-message',
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      ButtonComponent
   ],
  templateUrl: './template-message.component.html',
  styleUrl: './template-message.component.scss'
})
export class TemplateMessageComponent {
   private readonly themeService = inject(ThemeService);
   private readonly pageTranslationPipe = inject(PageTranslationPipe);
   data = input.required<PageComponentModel>();


   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });

   async copy() {
      try {
         if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(this.pageTranslationPipe.transform(this.data())?.description!);
         }
      } catch (err) {
         console.error("Erreur lors de la copie:", err);
      }
   }
}
