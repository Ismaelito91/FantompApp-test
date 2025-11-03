import { Component, inject, input, output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { ReplaceStringDarkPipe } from "../../../pipes/replace-string-dark.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { UtilsService } from "../../../service/utils.service";
import { TagUnclickableComponent } from "../tag-unclickable/tag-unclickable.component";

@Component({
   selector: "app-card-18",
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      MatIconModule,
      MatButtonModule,
      TagUnclickableComponent,
      TranslatePipe,
      ReplaceStringDarkPipe,
   ],
   templateUrl: "./card-18.component.html",
   styleUrl: "./card-18.component.scss",
})
export class Card18Component {
   readonly utilsService = inject(UtilsService);
   data = input.required<PageComponentModel>();
   index = input.required<number>();
   maxIndex = input.required<number>();

   prev = output<void>();
   next = output<void>();
}
