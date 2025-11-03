import { Component, computed, inject, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { StripHtmlPipe } from "../../../pipes/strip-html.pipe";
import { ThemeService } from "../../../service/theme.service";
import { TranslatePipe } from "@ngx-translate/core";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";

@Component({
   selector: "app-card-1",
   imports: [
      MatIconModule,
      SafeHtmlPipe,
      StripHtmlPipe,
      PageTranslationPipe,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-1.component.html",
   styleUrl: "./card-1.component.scss",
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
