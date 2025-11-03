import { Component, input, output } from "@angular/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { StripHtmlPipe } from "../../../pipes/strip-html.pipe";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslatePipe } from "@ngx-translate/core";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";

@Component({
   selector: "app-card-11",
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      StripHtmlPipe,
      MatIconModule,
      MatButtonModule,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-11.component.html",
   styleUrl: "./card-11.component.scss",
})
export class Card11Component {
   data = input.required<PageComponentModel>();
   index = input.required<number>();
   maxIndex = input.required<number>();

   prev = output<void>();
   next = output<void>();
}
