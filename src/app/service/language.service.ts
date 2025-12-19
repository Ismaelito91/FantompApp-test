import { Injectable, Signal, computed, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CountryRegion } from "../model/enum/country-region.enum";

export type SupportedLanguage = keyof typeof CountryRegion; // "FR" | "IE" | ...

const defaultLang: SupportedLanguage = "FR";
@Injectable({
   providedIn: "root",
})
export class LanguageService {
   private currentLang = signal<SupportedLanguage>(defaultLang);

   private overrideLang: SupportedLanguage | null = null;

   public setOverrideLang(lang: string | null) {
      const upper = (lang || "").toUpperCase();
      if (upper !== "") {
         this.overrideLang = upper as SupportedLanguage;
         this.setLanguage(this.overrideLang);
      } else {
         this.overrideLang = null;
      }
   }

   // Toutes les langues possibles (définies statiquement)
   private allLanguages: {
      code: SupportedLanguage;
      languageName: string; // Français, English, ...
      countryName: string; // France, Éire, ...
      flagUrl?: string; // svg flag url
      flagAltKey?: string; // Translation key for flag alt text
      lang: string; // html lang attribute
   }[] = [
      {
         code: "FR",
         languageName: "Français",
         countryName: CountryRegion.FR,
         flagUrl: "assets/images/flag/france.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.FRANCE",
         lang: "fr",
      },
      {
         code: "IE",
         languageName: "English",
         countryName: CountryRegion.IE,
         flagUrl: "assets/images/flag/Ireland.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.IRELAND",
         lang: "en-IE",
      },
      {
         code: "HU",
         languageName: "Magyar",
         countryName: CountryRegion.HU,
         flagUrl: "assets/images/flag/Hungary.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.HUNGARY",
         lang: "hu",
      },
      {
         code: "GR",
         languageName: "Ελληνικά",
         countryName: CountryRegion.GR,
         flagUrl: "assets/images/flag/grece.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.GREECE",
         lang: "el",
      },
      {
         code: "DK",
         languageName: "Dansk",
         countryName: CountryRegion.DK,
         flagUrl: "assets/images/flag/dansk.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.DENMARK",
         lang: "da",
      },
      {
         code: "PL",
         languageName: "Polski",
         countryName: CountryRegion.PL,
         flagUrl: "assets/images/flag/Poland.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.POLAND",
         lang: "pl",
      },
      {
         code: "PT",
         languageName: "Português",
         countryName: CountryRegion.PT,
         flagUrl: "assets/images/flag/Portugal.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.PORTUGAL",
         lang: "pt",
      },
      {
         code: "ES",
         languageName: "Español",
         countryName: CountryRegion.ES,
         flagUrl: "assets/images/flag/spain.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.SPAIN",
         lang: "es",
      },
      {
         code: "CT",
         languageName: "Español",
         countryName: CountryRegion.CT,
         flagUrl: "assets/images/flag/spain.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.CATALONIA",
         lang: "ca-ES",
      },
      {
         code: "LU",
         languageName: "Lëtzebuergesch",
         countryName: CountryRegion.LU,
         flagUrl: "assets/images/flag/Luxembourg.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.LUXEMBOURG",
         lang: "lb",
      },
      {
         code: "XX",
         languageName: "International",
         countryName: CountryRegion.XX,
         flagUrl: "",
         flagAltKey: "ALT_TEXT.COUNTRIES.INTERNATIONAL",
         lang: "en",
      },
   ];

   // Langues supportées filtrées selon la configuration backend
   public supportedLanguages: {
      code: SupportedLanguage;
      languageName: string;
      countryName: string;
      flagUrl?: string;
      flagAltKey?: string;
      lang: string;
   }[] = this.allLanguages;

   constructor(private translateService: TranslateService) {
      this.initLanguage();
   }

   /**
    * Filtre les langues supportées selon la configuration du backend
    * @param enabledLanguages Liste des codes de langues activées (ex: ["FR", "XX"])
    */
   public filterSupportedLanguages(enabledLanguages: string[]): void {
      if (!enabledLanguages || enabledLanguages.length === 0) {
         // Si aucune langue n'est fournie, on garde toutes les langues par défaut
         this.supportedLanguages = this.allLanguages;
         return;
      }

      const enabledCodes = enabledLanguages.map((lang) => lang.toUpperCase());
      this.supportedLanguages = this.allLanguages.filter((lang) =>
         enabledCodes.includes(lang.code)
      );

      // Si la langue actuelle n'est plus supportée, on bascule vers la première langue disponible
      if (
         this.supportedLanguages.length > 0 &&
         !this.supportedLanguages.some(
            (lang) => lang.code === this.currentLang()
         )
      ) {
         const firstAvailableLang = this.supportedLanguages[0].code;
         this.setLanguage(firstAvailableLang);
      }
   }

   public get language(): Signal<SupportedLanguage> {
      return computed(() => this.currentLang());
   }

   private initLanguage(): void {
      const savedLang = localStorage.getItem("lang") as SupportedLanguage;
      const rawBrowserLang =
         this.translateService.getBrowserCultureLang()?.toLowerCase() ||
         this.translateService.getBrowserLang()?.toLowerCase() ||
         "";

      let initialLang: SupportedLanguage;

      if (savedLang) {
         initialLang = savedLang;
      } else if (rawBrowserLang.startsWith("fr")) {
         initialLang = "FR";
      } else {
         initialLang = "XX";
      }

      this.setLanguage(initialLang);
   }

   public setLanguage(lang: SupportedLanguage): void {
      this.translateService.use(lang.toLowerCase());
      this.currentLang.set(lang);
      localStorage.setItem("lang", lang);
   }

   private isSupportedLanguage(lang: string): lang is SupportedLanguage {
      return Object.keys(CountryRegion).includes(lang);
   }
}
