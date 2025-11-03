import { Component, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { TagUnclickableComponent } from "../tag-unclickable/tag-unclickable.component";

@Component({
   selector: "app-card-19",
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      MatIconModule,
      MatButtonModule,
      TagUnclickableComponent,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-19.component.html",
   styleUrl: "./card-19.component.scss",
})
export class Card19Component {
   data = input.required<PageComponentModel>();
   index = input.required<number>();
   maxIndex = input.required<number>();

   prev = output<void>();
   next = output<void>();
}
