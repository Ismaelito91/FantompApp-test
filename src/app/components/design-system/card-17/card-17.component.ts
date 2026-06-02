import { Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { ThemeService } from '../../../service/theme.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ReplaceStringDarkPipe } from '../../../pipes/replace-string-dark.pipe';
import { ZoomLayoutService } from '../../../service/zoom-layout.service';

@Component({
   selector: "app-card-17",
   imports: [PageTranslationPipe,SafeHtmlPipe,MatIconModule,TranslatePipe,ReplaceStringDarkPipe,],
   templateUrl: "./card-17.component.html",
   styleUrl: "./card-17.component.scss",
})
export class Card17Component {
   private readonly themeService = inject(ThemeService);
   private readonly zoomLayout = inject(ZoomLayoutService);
   data = input.required<PageComponentModel>();

   shouldUseZoomLayout(): boolean {
      return this.zoomLayout.isZoomAtLeast(1.7);
   }

   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });
}
