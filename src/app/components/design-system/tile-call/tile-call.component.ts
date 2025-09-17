import { Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import PageComponentModel from '../../../model/page-component.model';
import { ThemeService } from '../../../service/theme.service';
import { StripHtmlPipe } from "../../../pipes/strip-html.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
   selector: 'app-tile-call',
   imports: [MatIconModule, StripHtmlPipe, SafeHtmlPipe, PageTranslationPipe, TranslatePipe],
   templateUrl: './tile-call.component.html',
   styleUrl: './tile-call.component.scss'
})
export class TileCallComponent {
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
