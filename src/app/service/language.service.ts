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

   public supportedLanguages: { code: SupportedLanguage; name: string }[] = Object.entries(CountryRegion).map(
      ([code, name]) => ({
         code: code as SupportedLanguage,
         name,
      })
   );

   constructor(private translateService: TranslateService) {
      this.initLanguage();
   }

   public get language(): Signal<SupportedLanguage> {
      return computed(() => this.currentLang());
   }

   private initLanguage(): void {
      const savedLang = localStorage.getItem("lang") as SupportedLanguage;
      const browserLang = this.translateService.getBrowserLang()?.toUpperCase() as SupportedLanguage;
      const initialLang = savedLang || (this.isSupportedLanguage(browserLang) ? browserLang : defaultLang);

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
