import { Injectable, Signal, computed, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CountryRegion } from "../model/enum/country-region.enum";

export type SupportedLanguage = keyof typeof CountryRegion;

interface LanguageEntry {
   code: SupportedLanguage;
   languageName: string;
   countryName: string;
   flagUrl?: string;
   flagAltKey?: string;
   lang: string;
}

@Injectable({
   providedIn: "root",
})
export class LanguageService {
   private currentLang = signal<SupportedLanguage>("FR");

   private readonly allLanguages: LanguageEntry[] = [
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

   public supportedLanguages: LanguageEntry[] = this.allLanguages;

   constructor(private translateService: TranslateService) {
      this.sortByBrowserPreference();
      this.initLanguage();
   }

   public setOverrideLang(lang: string | null) {
      const upper = (lang || "").toUpperCase();
      if (upper !== "") {
         this.setLanguage(upper as SupportedLanguage);
      }
   }

   public filterSupportedLanguages(enabledLanguages: string[]): void {
      if (!enabledLanguages || enabledLanguages.length === 0) {
         this.supportedLanguages = this.allLanguages;
      } else {
         const enabledCodes = enabledLanguages.map((l) => l.toUpperCase());
         this.supportedLanguages = this.allLanguages.filter((lang) =>
            enabledCodes.includes(lang.code)
         );
      }

      this.sortByBrowserPreference();
   }

   public get language(): Signal<SupportedLanguage> {
      return computed(() => this.currentLang());
   }

   public setLanguage(lang: SupportedLanguage): void {
      this.translateService.use(lang.toLowerCase());
      this.currentLang.set(lang);
      localStorage.setItem("lang", lang);
   }

   private initLanguage(): void {
      const savedLang = localStorage.getItem("lang") as SupportedLanguage;
      this.setLanguage(savedLang || this.detectLanguageFromBrowser());
   }

   private getBrowserLangs(): string[] {
      return (navigator.languages ?? [navigator.language])
         .map((l) => l.toLowerCase());
   }

   private detectLanguageFromBrowser(): SupportedLanguage {
      const browserLangs = this.getBrowserLangs();
      let bestMatch: SupportedLanguage = "XX";
      let bestScore = 0;

      for (const entry of this.supportedLanguages) {
         const score = this.getBrowserMatchScore(entry, browserLangs);
         if (score > bestScore) {
            bestScore = score;
            bestMatch = entry.code;
         }
      }

      return bestMatch;
   }

   /**
    * Trie supportedLanguages pour que les langues correspondant
    * au pays détecté dans le navigateur apparaissent en haut,
    * avec XX (International) toujours en 2e position.
    */
   private sortByBrowserPreference(): void {
      const browserLangs = this.getBrowserLangs();

      this.supportedLanguages.sort((a, b) => {
         return this.getBrowserMatchScore(b, browserLangs)
              - this.getBrowserMatchScore(a, browserLangs);
      });

      const xxIndex = this.supportedLanguages.findIndex((l) => l.code === "XX");
      if (xxIndex > 1) {
         const [xx] = this.supportedLanguages.splice(xxIndex, 1);
         this.supportedLanguages.splice(1, 0, xx);
      }
   }

   private getBrowserMatchScore(
      entry: LanguageEntry,
      browserLangs: string[]
   ): number {
      const tag = entry.lang.toLowerCase();
      const code = entry.code.toLowerCase();

      for (let i = 0; i < browserLangs.length; i++) {
         const bl = browserLangs[i];
         const positionScore = (browserLangs.length - i) * 10;
         const blParts = bl.split("-");

         if (bl === tag) return positionScore + 3;

         if (blParts.length >= 2 && blParts[blParts.length - 1] === code) {
            return positionScore + 2;
         }

         if (blParts[0] === tag.split("-")[0]) return positionScore + 1;
      }

      return 0;
   }
}
