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
      const upper = (lang || '').toUpperCase();
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
   }[] = [
      { code: "FR", languageName: "Français", countryName: CountryRegion.FR, flagUrl: "assets/flags/fr.png" },
      { code: "IE", languageName: "English", countryName: CountryRegion.IE, flagUrl: "assets/flags/ie.png" },
      { code: "HU", languageName: "Magyar", countryName: CountryRegion.HU, flagUrl: "assets/flags/hu.png" },
      { code: "GR", languageName: "Ελληνικά", countryName: CountryRegion.GR, flagUrl: "assets/flags/gr.png" },
      { code: "DK", languageName: "Dansk", countryName: CountryRegion.DK, flagUrl: "assets/flags/dk.png" },
      { code: "PL", languageName: "Polski", countryName: CountryRegion.PL, flagUrl: "assets/flags/pl.png" },
      { code: "PT", languageName: "Português", countryName: CountryRegion.PT, flagUrl: "assets/flags/pt.png" },
      { code: "ES", languageName: "Español", countryName: CountryRegion.ES, flagUrl: "assets/flags/es.png" },
      { code: "CT", languageName: "Español", countryName: CountryRegion.CT, flagUrl: "assets/flags/ct.png" },
      { code: "LU", languageName: "Lëtzebuergesch", countryName: CountryRegion.LU, flagUrl: "assets/flags/lu.png" },
      { code: "XX", languageName: "International", countryName: CountryRegion.XX, flagUrl: "" },
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
