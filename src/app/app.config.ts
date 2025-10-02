import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
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
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from "@angular/router";
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
            scrollPositionRestoration: 'enabled', // remet en haut automatiquement
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
   ],
};
