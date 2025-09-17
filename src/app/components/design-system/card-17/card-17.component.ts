import { Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { ThemeService } from '../../../service/theme.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
   selector: 'app-card-17',
   imports: [PageTranslationPipe, SafeHtmlPipe, MatIconModule, TranslatePipe],
   templateUrl: './card-17.component.html',
   styleUrl: './card-17.component.scss'
})
export class Card17Component {
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
