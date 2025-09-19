import { Component, computed, inject, input } from '@angular/core';
import PageComponentModel from '../../../model/page-component.model';
import { ThemeService } from '../../../service/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
   selector: 'app-card-2',
   imports: [MatIconModule, SafeHtmlPipe, PageTranslationPipe, TranslatePipe],
   templateUrl: './card-2.component.html',
   styleUrl: './card-2.component.scss'
})
export class Card2Component {
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
