import { Component, OnInit, ViewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenu, MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../service/language.service";
import { RouterModule } from "@angular/router";

@Component({
   selector: "app-header",
   standalone: true,
   imports: [
      MatIconModule,
      MatToolbarModule,
      MatMenuModule,
      MatButtonModule,
      TranslateModule,
      RouterModule,
   ],
   templateUrl: "./header.component.html",
   styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {

   constructor(
      public _languageService: LanguageService
   ) {}

   ngOnInit(): void {
      
   }

   // Fournit l'URL du drapeau de la langue courante
   get currentFlagUrl(): string {
      const current = this._languageService.supportedLanguages.find(
         l => l.code === this._languageService.language()
      );
      return current?.flagUrl || '';
   }
}
