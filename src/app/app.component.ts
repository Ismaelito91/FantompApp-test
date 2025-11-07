import { Component, OnInit, inject, effect, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import {
   ActivatedRoute,
   NavigationEnd,
   Router,
   RouterOutlet,
} from "@angular/router";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { OnboardingComponent } from "./components/home/onboarding/onboarding.component";
import { LanguageService } from "./service/language.service";
import { OnboardingService } from "./service/onboarding.service";
import { PwaService } from "./service/pwa/pwa.service";
import { SettingService } from "./service/setting.service";
import { filter, map } from "rxjs";
import { PreloadService } from "./service/preload.service";
import { IconGeneratorService } from "./service/icon-generator.service";
import { DeviceService } from "./service/device.service";
import { UtilsService } from "./service/utils.service";

@Component({
   selector: "app-root",
   standalone: true,
   imports: [
      RouterOutlet,
      HeaderComponent,
      FooterComponent,
      TranslateModule,
      CommonModule,
      OnboardingComponent,
   ],
   templateUrl: "./app.component.html",
   styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
   _settingService = inject(SettingService);
   _onboardingService = inject(OnboardingService);
   private translateService = inject(TranslateService);
   private languageService = inject(LanguageService);
   private matIconRegistry = inject(MatIconRegistry);
   private domSanitizer = inject(DomSanitizer);
   private pwaService = inject(PwaService);
   private router = inject(Router);
   private activatedRoute = inject(ActivatedRoute);
   private deviceService = inject(DeviceService);
   public utilsService = inject(UtilsService);
   hideHeader = false;
   hideFooter = false;
   private preloadService = inject(PreloadService);
   // Force l'initialisation de l'IconGeneratorService au démarrage
   private _iconGen = inject(IconGeneratorService);
   @ViewChild('mainContent', { static: false }) mainContentRef?: ElementRef<HTMLElement>;

   constructor() {
      // Mettre à jour l'attribut lang sur <html> quand la langue change
      effect(() => {
         const langCode = this.languageService.language();
         const htmlLang = this.mapLanguageCodeToHtmlLang(langCode);
         if (document.documentElement) {
            document.documentElement.lang = htmlLang;
         }
      });
   }

   private mapLanguageCodeToHtmlLang(langCode: string): string {
      const langMap: Record<string, string> = {
         FR: "fr",
         IE: "en",
         HU: "hu",
         GR: "el",
         DK: "da",
         PL: "pl",
         PT: "pt",
         ES: "es",
         CT: "es",
         LU: "lb",
         XX: "en",
      };
      return langMap[langCode] || "fr";
   }

   ngOnInit(): void {
      // Appliquer les overrides via query params avant le preload
      const url = new URL(window.location.href);
      const deviceParam = url.searchParams.get("device");
      const langParam = url.searchParams.get("lang");
      this.languageService.setOverrideLang(langParam);
      this.deviceService.setOverride(deviceParam);

      // On écoute les changements de route pour activer/masquer le header/footer
      this.router.events
         .pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
               let route = this.activatedRoute.firstChild;
               while (route?.firstChild) {
                  route = route.firstChild;
               }
               return route;
            }),
            filter((route) => !!route),
            map((route) => route!.snapshot.data)
         )
         .subscribe((data) => {
            this.hideFooter = data["hideFooter"] ?? false;
            this.hideHeader = data["hideHeader"] ?? false;
            // Forcer le scroll en haut de page à chaque changement de route
            requestAnimationFrame(() => {
               const mainContent = this.mainContentRef?.nativeElement || document.querySelector('.main-content') as HTMLElement;
               if (mainContent) {
                  mainContent.scrollTop = 0;
               }
               // Fallback sur window au cas où
               window.scrollTo(0, 0);
            });
         });

      // Définir les langues disponibles
      const supportedLanguageCodes =
         this.languageService.supportedLanguages.map((lang) => lang.code);
      this.translateService.addLangs(supportedLanguageCodes);

      // Langue par défaut pour les clés manquantes
      this.translateService.setDefaultLang("fr");

      // Le service de langue gère le choix de la langue
      // Il est déjà injecté et s'initialise automatiquement

      //initialisation du service PWA

      // on ne demande plus l'installation de l'app, qui perturbe les animations
      //this.pwaService.initPwaPrompt();
      this.pwaService.checkForUpdates();

      // Initialisation du service onboarding
      // Le service vérifie automatiquement si c'est la première visite
      console.log("Onboarding service initialized");

      // Démarrer le préchargement de toutes les données
      this.preloadService.preloadAllData();

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
            path: "assets/images/toolbar/dark/icon-tools-dark.svg",
         },
         {
            name: "tools-dark-active",
            path: "assets/images/toolbar/dark/actif/icon-tools-dark-actif.svg",
         },
      ];

      const neutralIcons = [
         {
            name: "chevron16x16-icon",
            path: "assets/images/chevron16x16-icon.svg",
         },
         {
            name: "chevron24x24-icon",
            path: "assets/images/chevron24x24-icon.svg",
         },
         {
            name: "icone-tools",
            path: "assets/images/icone-tools.svg",
         },
         {
            name: "close24x24-icon",
            path: "assets/images/close24x24-icon.svg",
         },
         {
            name: "icon-redo24x24",
            path: "assets/images/icon-redo24x24.svg",
         },
         {
            name: "icon-check24x24",
            path: "assets/images/icon-check24x24.svg",
         },
         {
            name: "icon-download24x24",
            path: "assets/images/icon-download24x24.svg",
         },
         {
            name: "icon-copy16x16",
            path: "assets/images/icon-copy16x16.svg",
         },
         {
            name: "icon-definition24x24",
            path: "assets/images/icon-definition24x24.svg",
         },
         {
            name: "icon-external-link24x24",
            path: "assets/images/icon-external-link24x24.svg",
         },
         {
            name: "checkbox-selected16x16-icon",
            path: "assets/images/checkbox-selected16x16-icon.svg",
         },
         {
            name: "checkbox-unselected16x16-icon",
            path: "assets/images/checkbox-unselected16x16-icon.svg",
         },
         {
            name: "arrow24x24-icon",
            path: "assets/images/arrow24x24-icon.svg",
         },

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
            path: "assets/images/toolbar/clear/icon-tools-clear.svg",
         },
         {
            name: "tools-clear-active",
            path: "assets/images/toolbar/clear/actif/icon-tools-clear-actif.svg",
         },
      ];

      // Enregistrer toutes les icônes
      [...lightIcons, ...darkIcons, ...neutralIcons].forEach((icon) => {
         //console.log(`Registering icon: ${icon.name} from ${icon.path}`);
         this.matIconRegistry.addSvgIcon(
            icon.name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
         );
      });

      // Enregistrement des icônes d'onboarding
      const onboardingIcons = [
         {
            name: "fantome-logo",
            path: "assets/images/onboarding/logo fantomapp.svg",
         },
         {
            name: "onboarding-illustration",
            path: "assets/images/onboarding/illu-onboarding.svg",
         },
         {
            name: "onboarding-illustration-4",
            path: "assets/images/onboarding/illu-onboarding-4.svg",
         },
         {
            name: "switch-pancarte",
            path: "assets/images/onboarding/switch pancarte.svg",
         },
         {
            name: "switch-triste",
            path: "assets/images/onboarding/Switch triste img.svg",
         },
         {
            name: "icon-arrow-right",
            path: "assets/images/onboarding/icon-arrow-right.svg",
         },
      ];

      onboardingIcons.forEach((icon) => {
         this.matIconRegistry.addSvgIcon(
            icon.name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
         );
      });

      // Enregistrement des icônes de password check
      const passwordCheckIcons = [
         {
            name: "password-eye-open",
            path: "assets/images/icon-password-eye-open.svg",
         },
         {
            name: "password-eye-closed",
            path: "assets/images/icon-password-eye-closed.svg",
         },
         {
            name: "password-copy",
            path: "assets/images/icon-password-copy.svg",
         },
      ];

      passwordCheckIcons.forEach((icon) => {
         this.matIconRegistry.addSvgIcon(
            icon.name,
            this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
         );
      });
   }
}
