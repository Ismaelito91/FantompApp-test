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
   translateLocale?: string;
   browserLangGuard?: string;
}

@Injectable({
   providedIn: "root",
})
export class LanguageService {
   private currentLang = signal<SupportedLanguage>("FR");
   private readonly preferredWhenNoStrongMatch: SupportedLanguage[] = [
      "XX",
      "FR",
   ];

   // Source unique des langues: affichage, locale de traduction et règles de matching.
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
         code: "BEFR",
         languageName: "Français (Belgique)",
         countryName: CountryRegion.BEFR,
         flagUrl: "assets/images/flag/belgium.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.BELGIUM_FRENCH",
         lang: "fr-BE",
         translateLocale: "fr-be",
      },
      {
         code: "BENL",
         languageName: "Nederlands (België)",
         countryName: CountryRegion.BENL,
         flagUrl: "assets/images/flag/belgium.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.BELGIUM_DUTCH",
         lang: "nl-BE",
         translateLocale: "benl",
      },
      {
         code: "IE",
         languageName: "English",
         countryName: CountryRegion.IE,
         flagUrl: "assets/images/flag/Ireland.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.IRELAND",
         lang: "en-IE",
         browserLangGuard: "en",
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
         translateLocale: "sv",
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
         translateLocale: "el",
      },
      {
         code: "DK",
         languageName: "Dansk",
         countryName: CountryRegion.DK,
         flagUrl: "assets/images/flag/dansk.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.DENMARK",
         lang: "da",
         translateLocale: "dk",
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
         languageName: "Català",
         countryName: CountryRegion.CT,
         flagUrl: "assets/images/flag/ES-CT.svg",
         flagAltKey: "ALT_TEXT.COUNTRIES.CATALONIA",
         lang: "ca-ES",
         translateLocale: "ct",
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
         translateLocale: "xx",
      },
   ];

   // Liste effectivement affichée (après filtre backend + tri navigateur).
   public supportedLanguages: LanguageEntry[] = this.allLanguages;

   constructor(private translateService: TranslateService) {
      this.sortByBrowserPreference();
      this.initLanguage();
   }

   public setOverrideLang(lang: string | null) {
      const upper = (lang || "").toUpperCase();
      if (upper !== "" && this.isSupportedLanguage(upper)) {
         this.setLanguage(upper);
      }
   }

   // Applique les langues autorisées par l'API puis recalcule l'ordre d'affichage.
   public filterSupportedLanguages(enabledLanguages: string[]): void {
      if (!enabledLanguages || enabledLanguages.length === 0) {
         this.supportedLanguages = this.allLanguages;
      } else {
         const enabledCodes = new Set(enabledLanguages.map((l) => l.toUpperCase()));
         this.supportedLanguages = this.allLanguages.filter((lang) =>
            enabledCodes.has(lang.code),
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

   public getAvailableTranslateLocales(): string[] {
      const locales = this.supportedLanguages.map((l) =>
         this.getTranslateLocale(l.code),
      );
      return [...new Set(locales)];
   }

   public setLanguage(lang: SupportedLanguage): void {
      this.translateService.use(this.getTranslateLocale(lang));
      this.currentLang.set(lang);
      localStorage.setItem("lang", lang);
   }

   public getHtmlLang(code: SupportedLanguage): string {
      const entry = this.getLanguageEntry(code);
      return entry?.lang ?? "fr";
   }

   private initLanguage(): void {
      const savedLang = localStorage.getItem("lang");
      const initialLang =
         savedLang && this.isSupportedLanguage(savedLang)
            ? savedLang
            : this.detectLanguageFromBrowser();
      this.setLanguage(initialLang);
   }

   // Compare la locale navigateur à chaque entrée pour déterminer la meilleure langue.
   private getBrowserLangs(): string[] {
      if (typeof navigator === "undefined") return [];
      return (navigator.languages ?? [navigator.language]).map((l) =>
         l.toLowerCase(),
      );
   }

   private browserMatchScore(entry: LanguageEntry, primary: string): number {
      if (!primary) return 0;
      const tag = entry.lang.toLowerCase();
      const code = entry.code.toLowerCase();
      const parts = primary.split("-");
      if (primary === tag) return 3;
      if (parts.length >= 2 && parts[parts.length - 1] === code) {
         const requiredLang = entry.browserLangGuard;
         if (requiredLang && parts[0] !== requiredLang) return 0;
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

   // Priorité d'affichage: langue détectée + XX, sinon XX puis FR.
   private sortByBrowserPreference(): void {
      const { code: bestCode, score } = this.computeBestMatch();
      if (!bestCode || score === 0 || bestCode === "XX") {
         this.supportedLanguages = this.orderLanguages(
            this.preferredWhenNoStrongMatch,
         );
      } else {
         this.supportedLanguages = this.orderLanguages([bestCode, "XX"]);
      }
   }

   private getTranslateLocale(lang: SupportedLanguage): string {
      const entry = this.getLanguageEntry(lang);
      return entry?.translateLocale ?? lang.toLowerCase();
   }

   private getLanguageEntry(code: SupportedLanguage): LanguageEntry | undefined {
      return this.allLanguages.find((l) => l.code === code);
   }

   private isSupportedLanguage(code: string): code is SupportedLanguage {
      return this.allLanguages.some((l) => l.code === code);
   }

   // Place d'abord les langues prioritaires, puis trie le reste par pays.
   private orderLanguages(priority: SupportedLanguage[]): LanguageEntry[] {
      const prioritized = priority
         .map((code) => this.supportedLanguages.find((l) => l.code === code))
         .filter((l): l is LanguageEntry => Boolean(l));
      const excludedCodes = new Set(prioritized.map((l) => l.code));
      const rest = [...this.supportedLanguages]
         .filter((l) => !excludedCodes.has(l.code))
         .sort((a, b) =>
            a.countryName.localeCompare(b.countryName, "fr", {
               sensitivity: "base",
            }),
         );
      return [...prioritized, ...rest];
   }
}