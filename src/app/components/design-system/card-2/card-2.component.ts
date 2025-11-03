import { Component, computed, inject, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ThemeService } from "../../../service/theme.service";

@Component({
   selector: "app-card-2",
   imports: [
      MatIconModule,
      SafeHtmlPipe,
      PageTranslationPipe,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-2.component.html",
   styleUrl: "./card-2.component.scss",
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
