import { Component, inject, input } from "@angular/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { StripHtmlPipe } from "../../../pipes/strip-html.pipe";
import { PageComponentUtilsService } from "../../../service/page-component-utils.service";
import { TranslatePipe } from "@ngx-translate/core";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";

@Component({
   selector: "app-card-20",
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      StripHtmlPipe,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-20.component.html",
   styleUrl: "./card-20.component.scss",
})
export class Card20Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }
}
