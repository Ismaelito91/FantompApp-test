import { Component, computed, inject, input, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../service/theme.service';
import PageComponentModel from '../../../model/page-component.model';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";

@Component({
   selector: 'app-card-1',
   imports: [
    MatIconModule,
    SafeHtmlPipe,
    PageTranslationPipe
],
   templateUrl: './card-1.component.html',
   styleUrl: './card-1.component.scss'
})
export class Card1Component {
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
