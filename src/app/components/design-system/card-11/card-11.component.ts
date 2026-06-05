import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { LanguageService } from "../../../service/language.service";

@Component({
   selector: "app-card-11",
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      MatIconModule,
      MatButtonModule,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-11.component.html",
   styleUrl: "./card-11.component.scss",
})
export class Card11Component {
   private readonly translate = inject(TranslateService);
   private readonly languageService = inject(LanguageService);

   data = input.required<PageComponentModel>();
   index = input.required<number>();
   maxIndex = input.required<number>();

   prev = output<void>();
   next = output<void>();

   get slideTitle(): string {
      const page = this.data();
      if (!page?.translations?.length) {
         return "";
      }
      const lang = this.languageService.language();
      const match =
         page.translations.find((t) => t.countryRegion === lang) ??
         page.translations.find((t) => t.countryRegion === "XX") ??
         page.translations.find((t) => t.countryRegion === "FR");
      if (!match?.firstTitle) {
         return "";
      }
      const html = this.translate.instant(match.firstTitle);
      // Strip HTML tags so the aria-label doesn't contain raw markup (e.g. <p>…</p>)
      return html.replace(/<[^>]*>/g, '').trim();
   }
}
