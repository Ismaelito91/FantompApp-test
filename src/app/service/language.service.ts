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

   public supportedLanguages: {
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
      // {
      //    code: "IE",
      //    languageName: "English",
      //    countryName: CountryRegion.IE,
      //    flagUrl: "assets/images/flag/Ireland.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.IRELAND",
      //    lang: "en-IE",
      // },
      // {
      //    code: "HU",
      //    languageName: "Magyar",
      //    countryName: CountryRegion.HU,
      //    flagUrl: "assets/images/flag/Hungary.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.HUNGARY",
      //    lang: "hu",
      // },
      // {
      //    code: "GR",
      //    languageName: "Ελληνικά",
      //    countryName: CountryRegion.GR,
      //    flagUrl: "assets/images/flag/grece.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.GREECE",  
      //    lang: "el",
      // },
      // {
      //    code: "DK",
      //    languageName: "Dansk",
      //    countryName: CountryRegion.DK,
      //    flagUrl: "assets/images/flag/dansk.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.DENMARK",
      //    lang: "da",
      // },
      // {
      //    code: "PL",
      //    languageName: "Polski",
      //    countryName: CountryRegion.PL,
      //    flagUrl: "assets/images/flag/Poland.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.POLAND",
      //    lang: "pl",
      // },
      // {
      //    code: "PT",
      //    languageName: "Português",
      //    countryName: CountryRegion.PT,
      //    flagUrl: "assets/images/flag/Portugal.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.PORTUGAL",
      //    lang: "pt",
      // },
      // {
      //    code: "ES",
      //    languageName: "Español",
      //    countryName: CountryRegion.ES,
      //    flagUrl: "assets/images/flag/spain.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.SPAIN",
      //    lang: "es",
      // },
      // {
      //    code: "CT",
      //    languageName: "Español",
      //    countryName: CountryRegion.CT,
      //    flagUrl: "assets/images/flag/spain.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.CATALONIA",
      //    lang: "ca-ES",
      // },
      // {
      //    code: "LU",
      //    languageName: "Lëtzebuergesch",
      //    countryName: CountryRegion.LU,
      //    flagUrl: "assets/images/flag/Luxembourg.svg",
      //    flagAltKey: "ALT_TEXT.COUNTRIES.LUXEMBOURG",
      //    lang: "lb",
      // },
      {
         code: "XX",
         languageName: "International",
         countryName: CountryRegion.XX,
         flagUrl: "",
         flagAltKey: "ALT_TEXT.GENERAL.FLAG",
         lang: "en"
      },
   ];

   constructor(private translateService: TranslateService) {
      this.initLanguage();
   }

   public get language(): Signal<SupportedLanguage> {
      return computed(() => this.currentLang());
   }

   private initLanguage(): void {
      const savedLang = localStorage.getItem("lang") as SupportedLanguage;
      const browserLang = this.translateService
         .getBrowserLang()
         ?.toUpperCase() as SupportedLanguage;
      const initialLang =
         savedLang ||
         (this.isSupportedLanguage(browserLang) ? browserLang : defaultLang);

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
