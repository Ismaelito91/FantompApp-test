import { Injectable, Signal, computed, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export type SupportedLanguage =
   | "fr"
   | "en"
   | "pt"
   | "es"
   | "ca"
   | "pl"
   | "da"
   | "el"
   | "hu";

@Injectable({
   providedIn: "root",
})
export class LanguageService {
   private currentLang = signal<SupportedLanguage>("fr");

   public supportedLanguages: { code: SupportedLanguage; name: string }[] = [
      { code: "fr", name: "Français" },
      { code: "en", name: "English" },
      { code: "pt", name: "Português" },
      { code: "es", name: "Español" },
      { code: "ca", name: "Català" },
      { code: "pl", name: "Polski" },
      { code: "da", name: "Dansk" },
      { code: "el", name: "Ελληνικά" },
      { code: "hu", name: "Magyar" },
   ];

   constructor(private translateService: TranslateService) {
      // Initialiser la langue par défaut
      this.initLanguage();
   }

   public get language(): Signal<SupportedLanguage> {
      return computed(() => this.currentLang());
   }

   private initLanguage(): void {
      // Vérifie si une langue est stockée dans localStorage
      const savedLang = localStorage.getItem("lang") as SupportedLanguage;

      // Vérifie si la langue du navigateur est supportée
      const browserLang =
         this.translateService.getBrowserLang() as SupportedLanguage;
      const defaultLang: SupportedLanguage = "fr";

      // Utiliser la langue sauvegardée, ou la langue du navigateur, ou le français par défaut
      const initialLang =
         savedLang ||
         (this.isSupportedLanguage(browserLang) ? browserLang : defaultLang);

      this.setLanguage(initialLang);
   }

   public setLanguage(lang: SupportedLanguage): void {
      this.translateService.use(lang);
      this.currentLang.set(lang);
      localStorage.setItem("lang", lang);
   }

   private isSupportedLanguage(lang: string): lang is SupportedLanguage {
      return this.supportedLanguages.some((l) => l.code === lang);
   }
}
