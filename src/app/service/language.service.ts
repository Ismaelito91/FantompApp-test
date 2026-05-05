import { Injectable, Signal, computed, signal } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { CountryRegion } from "../model/enum/country-region.enum";

export type SupportedLanguage = keyof typeof CountryRegion;

interface LanguageEntry {
   code: SupportedLanguage;
   languageName: string;
   countryName: string;
   flagUrl?: string;
   flagEmoji?: string;
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
         code: "SK",
         languageName: "Slovenčina",
         countryName: CountryRegion.SK,
         flagUrl: "assets/images/flag/Slovakia.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.SLOVAKIA",
         lang: "sk",
      },
      {
         code: "SE",
         languageName: "Svenska",
         countryName: CountryRegion.SE,
         flagUrl: "assets/images/flag/Sweden.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.SWEDEN",
         lang: "sv",
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
         lang: "xx",
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
            enabledCodes.includes(lang.code),
         );
      }

      this.sortByBrowserPreference();

      if (
         this.supportedLanguages.length > 0 &&
         !this.supportedLanguages.some((l) => l.code === this.currentLang())
      ) {
         const xx = this.supportedLanguages.find((l) => l.code === "XX");
         this.setLanguage(xx?.code ?? this.supportedLanguages[0].code);
      }
      this.translateService.use(this.getTranslateLocale(this.currentLang()));
   }

   public get language(): Signal<SupportedLanguage> {
      return computed(() => this.currentLang());
   }

   public setLanguage(lang: SupportedLanguage): void {
      this.translateService.use(this.getTranslateLocale(lang));
      this.currentLang.set(lang);
      localStorage.setItem("lang", lang);
   }

   private initLanguage(): void {
      const savedLang = localStorage.getItem("lang") as SupportedLanguage;
      this.setLanguage(savedLang || this.detectLanguageFromBrowser());
   }

   private getBrowserLangs(): string[] {
      return (navigator.languages ?? [navigator.language]).map((l) =>
         l.toLowerCase(),
      );
   }

   /** Score sur la 1re locale seulement (évite un 2e choix navigateur qui ferait matcher ex. FR). */
   private browserMatchScore(entry: LanguageEntry, primary: string): number {
      if (!primary) return 0;
      const tag = entry.lang.toLowerCase();
      const code = entry.code.toLowerCase();
      const parts = primary.split("-");
      if (primary === tag) return 3;
      if (parts.length >= 2 && parts[parts.length - 1] === code) {
         if (code === "ie" && parts[0] !== "en") return 0;
         return 2;
      }
      if (parts[0] === tag.split("-")[0]) return 1;
      return 0;
   }

   private computeBestMatch(): {
      code: SupportedLanguage | null;
      score: number;
   } {
      const primary = this.getBrowserLangs()[0] ?? "";
      let code: SupportedLanguage | null = null;
      let score = 0;
      for (const entry of this.supportedLanguages) {
         const s = this.browserMatchScore(entry, primary);
         if (s > score) {
            score = s;
            code = entry.code;
         }
      }
      return { code, score };
   }

   private detectLanguageFromBrowser(): SupportedLanguage {
      const { code, score } = this.computeBestMatch();
      return score > 0 && code ? code : "XX";
   }

   /**
    * Pas de match fort (ou best = XX) : XX, FR, puis alphabétique.
    * Match fort : langue détectée, XX, puis alphabétique.
    */
   private sortByBrowserPreference(): void {
      const { code: bestCode, score } = this.computeBestMatch();
      const xx = this.supportedLanguages.find((l) => l.code === "XX");
      const alphabetical = (list: LanguageEntry[]): LanguageEntry[] =>
         [...list].sort((a, b) =>
            a.countryName.localeCompare(b.countryName, "fr", {
               sensitivity: "base",
            }),
         );

      if (!bestCode || score === 0 || bestCode === "XX") {
         const fr = this.supportedLanguages.find((l) => l.code === "FR");
         const rest = alphabetical(
            this.supportedLanguages.filter(
               (l) => l.code !== "XX" && l.code !== "FR",
            ),
         );
         this.supportedLanguages = [
            ...(xx ? [xx] : []),
            ...(fr ? [fr] : []),
            ...rest,
         ];
      } else {
         const detected = this.supportedLanguages.find(
            (l) => l.code === bestCode,
         )!;
         const rest = alphabetical(
            this.supportedLanguages.filter(
               (l) => l.code !== bestCode && l.code !== "XX",
            ),
         );
         this.supportedLanguages = [detected, ...(xx ? [xx] : []), ...rest];
      }
   }

   private getTranslateLocale(lang: SupportedLanguage): string {
      const entry = this.allLanguages.find((l) => l.code === lang);
      return entry?.lang ?? lang.toLowerCase();
   }
}
