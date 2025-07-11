import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LanguageService } from "./service/language.service";
import { PwaService } from "./service/pwa/pwa.service";
import { SettingService } from "./service/setting.service";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
   templateUrl: "./app.component.html",
   styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
   private translateService = inject(TranslateService);
   private languageService = inject(LanguageService);
   _settingService = inject(SettingService);
   private matIconRegistry = inject(MatIconRegistry);
   private domSanitizer = inject(DomSanitizer);
   private pwaService = inject(PwaService);

   ngOnInit(): void {
      // Définir les langues disponibles
      const supportedLanguageCodes =
         this.languageService.supportedLanguages.map((lang) => lang.code);
      this.translateService.addLangs(supportedLanguageCodes);

      // Langue par défaut pour les clés manquantes
      this.translateService.setDefaultLang("fr");

      // Le service de langue gère le choix de la langue
      // Il est déjà injecté et s'initialise automatiquement

      //initialisation du service PWA
      this.pwaService.initPwaPrompt();
      this.pwaService.checkForUpdates();

      // Enregistrement des icônes SVG personnalisées
      console.log("Registering SVG icons...");

      // Icônes en mode clair
      const lightIcons = [
         { name: "icon-sun-light", path: "assets/images/clear/icon-sun.svg" },
         {
            name: "icon-rights-light",
            path: "assets/images/clear/icon-rights.svg",
         },
         { name: "icon-what-light", path: "assets/images/clear/icon-what.svg" },
         { name: "icon-file-light", path: "assets/images/clear/icon-file.svg" },
         { name: "icon-play-light", path: "assets/images/clear/icon-play.svg" },
         { name: "app-icon-light", path: "assets/images/clear/app-icon.svg" },
         {
            name: "chevron24x24-icon-light",
            path: "assets/images/clear/chevron24x24-icon.svg",
         },
         {
            name: "icon-phone-light",
            path: "assets/images/clear/icon-phone.svg",
         },
         {
            name: "icon-message-light",
            path: "assets/images/clear/icon-message.svg",
         },
         {
            name: "icon-external-link-clear",
            path: "assets/images/clear/external-link.svg",
         },
      ];

      // Icônes en mode sombre
      const darkIcons = [
         { name: "icon-sun-dark", path: "assets/images/dark/icon-sun.svg" },
         {
            name: "icon-rights-dark",
            path: "assets/images/dark/icon-rights.svg",
         },
         { name: "icon-what-dark", path: "assets/images/dark/icon-what.svg" },
         { name: "icon-file-dark", path: "assets/images/dark/icon-file.svg" },
         { name: "icon-play-dark", path: "assets/images/dark/icon-play.svg" },
         { name: "app-icon-dark", path: "assets/images/dark/app-icon.svg" },
         {
            name: "chevron24x24-icon-dark",
            path: "assets/images/dark/chevron24x24-icon.svg",
         },
         { name: "icon-phone-dark", path: "assets/images/dark/icon-phone.svg" },
         {
            name: "icon-message-dark",
            path: "assets/images/dark/icon-message.svg",
         },
         {
            name: "icon-external-link-dark",
            path: "assets/images/dark/external-link.svg",
         },
         // Icônes Outils pour le mode sombre
         {
            name: "tools-dark-inactive",
            path: "assets/images/dark/icon-tools.svg",
         },
         {
            name: "tools-dark-active",
            path: "assets/images/dark/icon-tools-page.svg",
         },
      ];

      const neutralIcons = [
         { name: "chevron16x16-icon", path: "assets/images/chevron16x16-icon.svg" },
         { name: "checkbox-unselected16x16-icon", path: "assets/images/checkbox-unselected16x16-icon.svg" },
         // Icônes outline (état inactif)
         { name: "home-icon", path: "assets/images/home.svg" },
         { name: "problem-icon", path: "assets/images/problem.svg" },
         { name: "securiser-icon", path: "assets/images/securiser.svg" },
         // Icônes filled (état actif)
         { name: "home-icon-filled", path: "assets/images/homepage.svg" },
         { name: "problem-icon-filled", path: "assets/images/problempage.svg" },
         {
            name: "securiser-icon-filled",
            path: "assets/images/securisepage.svg",
         },
         // Icônes Outils pour le mode clair
         {
            name: "tools-clear-inactive",
            path: "assets/images/clear/icon-tools-clear.svg",
         },
         {
            name: "tools-clear-active",
            path: "assets/images/clear/icon-tools-page-clear.svg",
         }
      ];

      // Enregistrer toutes les icônes
      [...lightIcons, ...darkIcons, ...neutralIcons].forEach((icon) => {
         //console.log(`Registering icon: ${icon.name} from ${icon.path}`);
         this.matIconRegistry.addSvgIcon(
            icon.name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
         );
      });
   }
}
