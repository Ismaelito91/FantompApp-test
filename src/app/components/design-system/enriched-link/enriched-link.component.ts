import { Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import PageComponentModel from '../../../model/page-component.model';
import { StripHtmlPipe } from '../../../pipes/strip-html.pipe';
import { ThemeService } from '../../../service/theme.service';
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";

@Component({
   selector: 'app-enriched-link',
   imports: [MatIconModule, StripHtmlPipe, SafeHtmlPipe],
   templateUrl: './enriched-link.component.html',
   styleUrl: './enriched-link.component.scss'
})
export class EnrichedLinkComponent {
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
