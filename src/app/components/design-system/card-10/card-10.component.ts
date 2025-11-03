import { Component, inject, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import PageComponentModel from "../../../model/page-component.model";
import { PageComponentUtilsService } from "../../../service/page-component-utils.service";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { TranslatePipe } from "@ngx-translate/core";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { StripHtmlPipe } from "../../../pipes/strip-html.pipe";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";

@Component({
   selector: "app-card-10",
   imports: [
      MatIconModule,
      RouterLink,
      PageTranslationPipe,
      TranslatePipe,
      SafeHtmlPipe,
      StripHtmlPipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-10.component.html",
   styleUrl: "./card-10.component.scss",
})
export class Card10Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
