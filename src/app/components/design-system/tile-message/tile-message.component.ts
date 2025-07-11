import { Component, computed, inject, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { ThemeService } from '../../../service/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { StripHtmlPipe } from '../../../pipes/strip-html.pipe';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-tile-message',
   imports: [MatIconModule, StripHtmlPipe, SafeHtmlPipe, PageTranslationPipe],
   templateUrl: './tile-message.component.html',
   styleUrl: './tile-message.component.scss'
})
export class TileMessageComponent {
   private readonly themeService = inject(ThemeService);
   data = input.required<PageComponentModel>();

   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });
}
