import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SettingService } from "./service/setting.service";

import packageInfo from "../../package.json";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "./service/language.service";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
   templateUrl: "./app.component.html",
   styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
   _settingService = inject(SettingService);
   private translateService = inject(TranslateService);
   private languageService = inject(LanguageService);

   ngOnInit(): void {
      // Définir les langues disponibles
      const supportedLanguageCodes =
         this.languageService.supportedLanguages.map((lang) => lang.code);
      this.translateService.addLangs(supportedLanguageCodes);

      // Langue par défaut pour les clés manquantes
      this.translateService.setDefaultLang("fr");

      // Le service de langue gère le choix de la langue
      // Il est déjà injecté et s'initialise automatiquement
   }

   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return this._settingService.settings()?.version;
   }
}
