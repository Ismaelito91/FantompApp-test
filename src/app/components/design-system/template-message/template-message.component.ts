import { Component, computed, inject, input } from '@angular/core';
import { ThemeService } from "../../../service/theme.service";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ButtonComponent } from "../button/button.component";
import { ComponentType } from "../../../model/enum/component-type.enum";
import { ComponentStatus } from "../../../model/enum/component-status.enum";
import { Device } from "../../../model/enum/device.enum";
import { TranslatePipe } from "@ngx-translate/core";
import { LanguageService } from '../../../service/language.service';

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
   private readonly themeService = inject(ThemeService);
   private readonly pageTranslationPipe = inject(PageTranslationPipe);
   private readonly languageService = inject(LanguageService);
   data = input.required<PageComponentModel>();
   template_message: PageComponentModel =
      {
         id: 0,
         type: ComponentType.TEMPLATE_MESSAGE,
         status: ComponentStatus.PUBLISHED,
         translations: [{
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.DESCRIPTION",
         }],
      };


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
