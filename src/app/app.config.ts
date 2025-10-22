import {
   HttpClient,
   provideHttpClient,
   withInterceptors,
} from "@angular/common/http";
import {
   APP_INITIALIZER,
   ApplicationConfig,
   enableProdMode,
   importProvidersFrom,
   inject,
   isDevMode,
   provideAppInitializer,
   provideZoneChangeDetection,
} from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
   provideRouter,
   withComponentInputBinding,
   withInMemoryScrolling,
} from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { catchError, EMPTY, tap } from "rxjs";
import { environment } from "../environments/environment";
import { routes } from "./app.routes";
import { apiInterceptor } from "./interceptor/api.interceptor";
import { SettingService } from "./service/setting.service";
if (environment.production) {
   enableProdMode();
}
// Fonction factory pour le chargeur de traductions
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

function initSettings(_settingsService: SettingService) {
   // On récupère d'abord la configuration globale de l'application depuis le backend
   return _settingsService.getSettings().pipe(
      tap(async (settings) => {
         _settingsService.settings.set(settings);
         _settingsService.appStatus.set("initialized");
      }),
      catchError(() => {
         _settingsService.appStatus.set("failed");
         return EMPTY;
      })
   );
}

export const appConfig: ApplicationConfig = {
   providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      // retrait withViewTransitions pour fix problème Aie Aie Aie
      // si ouverture tutorial dialog sur me securiser sur chromium
      //provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
      provideRouter(
         routes,
         withInMemoryScrolling({
            scrollPositionRestoration: "enabled", // remet en haut automatiquement
         }),
         withComponentInputBinding()
      ),
      provideHttpClient(withInterceptors([apiInterceptor])),
      provideAnimations(), // Configuration des animations Angular
      provideAppInitializer(() => initSettings(inject(SettingService))),
      provideServiceWorker("ngsw-worker.js", {
         enabled: !isDevMode(),
         registrationStrategy: "registerWhenStable:30000",
      }),
      // Configuration du module de traduction
      importProvidersFrom(
         TranslateModule.forRoot({
            defaultLanguage: "fr",
            useDefaultLang: true,
            loader: {
               provide: TranslateLoader,
               useFactory: HttpLoaderFactory,
               deps: [HttpClient],
            },
         })
      ),
      {
         provide: APP_INITIALIZER,
         useFactory: (
            iconRegistry: MatIconRegistry,
            sanitizer: DomSanitizer
         ) => {
            return () => {
               iconRegistry.addSvgIcon(
                  "Switch-triste",
                  sanitizer.bypassSecurityTrustResourceUrl(
                     "assets/images/onboarding/Switch-triste img.svg"
                  )
               );
            };
         },
         deps: [MatIconRegistry, DomSanitizer],
         multi: true,
      },
      // Enregistre dynamiquement les icônes de la toolbar (dark / clear / actif)
      {
         provide: APP_INITIALIZER,
         useFactory: (
            iconRegistry: MatIconRegistry,
            sanitizer: DomSanitizer
         ) => {
            return () => {
               const base = "assets/images/toolbar";

               const icons: Record<
                  string,
                  {
                     dark?: { inactive: string; active: string };
                     clear?: { inactive: string; active: string };
                  }
               > = {
                  home: {
                     dark: {
                        inactive: "icon-home-dark.svg",
                        active: "icon-home-dark-actif.svg",
                     },
                     clear: {
                        inactive: "icon-home-clear.svg",
                        active: "icon-home-clear-active.svg",
                     },
                  },
                  problem: {
                     dark: {
                        inactive: "icon-problem-dark.svg",
                        active: "icon-problem-dark-actif.svg",
                     },
                     clear: {
                        inactive: "icon-problem-clear.svg",
                        active: "icon-probleme-clear-active.svg",
                     },
                  },
                  tools: {
                     dark: {
                        inactive: "icon-tools-dark.svg",
                        active: "icon-tools-dark-actif.svg",
                     },
                     clear: {
                        inactive: "icon-tools-clear.svg",
                        active: "icon-tools-clear-actif.svg",
                     },
                  },
                  secure: {
                     dark: {
                        inactive: "icon-secure-dark.svg",
                        active: "icon-secur-dark-actif.svg",
                     },
                     clear: {
                        inactive: "icon-seecur-clear.svg",
                        active: "icon-secure-clear-active.svg",
                     },
                  },
               };

               const register = (name: string, url: string) => {
                  try {
                     iconRegistry.addSvgIcon(
                        name,
                        sanitizer.bypassSecurityTrustResourceUrl(url)
                     );
                  } catch {
                     // ignore if registration fails
                  }
               };

               Object.keys(icons).forEach((key) => {
                  const data = icons[key];
                  if (data.dark) {
                     const inactive = `${base}/dark/${data.dark.inactive}`;
                     const active = `${base}/dark/actif/${data.dark.active}`;
                     register(`${key}-dark`, inactive);
                     register(`${key}-dark-inactive`, inactive);
                     register(`${key}-dark-active`, active);
                     register(`${key}-dark-actif`, active);
                  }
                  if (data.clear) {
                     const inactive = `${base}/clear/${data.clear.inactive}`;
                     const active = `${base}/clear/actif/${data.clear.active}`;
                     register(`${key}-clear`, inactive);
                     register(`${key}-clear-inactive`, inactive);
                     register(`${key}-clear-active`, active);
                     register(`${key}-clear-actif`, active);
                     // aliases 'light' in case some components use 'light' instead of 'clear'
                     register(`${key}-light`, inactive);
                     register(`${key}-light-inactive`, inactive);
                     register(`${key}-light-active`, active);
                     register(`${key}-light-actif`, active);
                  }
               });
            };
         },
         deps: [MatIconRegistry, DomSanitizer],
         multi: true,
      },
   ],
};
