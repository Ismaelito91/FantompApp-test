import { Component, inject, input } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Card10Component } from "../card-10/card-10.component";
import PageComponentModel from "../../../model/page-component.model";
import { PageComponentUtilsService } from "../../../service/page-component-utils.service";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { TranslatePipe } from "@ngx-translate/core";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";
import { StripHtmlPipe } from "../../../pipes/strip-html.pipe";

@Component({
   selector: "app-card-9",
   imports: [
      MatIconModule,
      Card10Component,
      PageTranslationPipe,
      TranslatePipe,
      SafeHtmlPipe,
      ReplaceStringDarkPipe,
      StripHtmlPipe,
   ],
   templateUrl: "./card-9.component.html",
   styleUrl: "./card-9.component.scss",
})
export class Card9Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   data = input.required<PageComponentModel>();

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }

   isOk(id: number) {
      return localStorage.getItem("sm-section-" + id) === "true";
   }

   onToggleOk(id: number) {
      if (this.isOk(id)) {
         localStorage.removeItem("sm-section-" + id);
      } else {
         localStorage.setItem("sm-section-" + id, "true");
      }
   }
}
