import { TitleCasePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ThemeService } from "../../service/theme.service";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../service/language.service";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule } from "@angular/router";

@Component({
   selector: "app-header",
   standalone: true,
   imports: [
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      TitleCasePipe,
      MatButtonModule,
      TranslateModule,
      MatDividerModule,
      RouterModule,
   ],
   templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
   constructor(
      public _themeService: ThemeService,
      public _languageService: LanguageService
   ) {}

   ngOnInit(): void {
      // This method is empty as per the original code
   }
}
