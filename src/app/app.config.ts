import {
   ApplicationConfig,
   inject,
   isDevMode,
   provideAppInitializer,
   provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { catchError, EMPTY, tap } from "rxjs";
import { routes } from "./app.routes";
import { apiInterceptor } from "./interceptor/api.interceptor";
import { SettingService } from "./service/setting.service";

import { provideServiceWorker } from "@angular/service-worker";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";

// Fonction factory pour le chargeur de traductions
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, "assets/i18n/", ".json");
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
      }) // Requis, sinon c'est le catch du bootstrapApplication qui est pris en compte
   );
}

export const appConfig: ApplicationConfig = {
   providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, withComponentInputBinding()),
      provideHttpClient(withInterceptors([apiInterceptor])),
      provideAppInitializer(() => initSettings(inject(SettingService))),
      provideServiceWorker("ngsw-worker.js", {
         enabled: !isDevMode(),
         registrationStrategy: "registerWhenStable:30000",
      }),
      // Configuration du module de traduction
      importProvidersFrom(
         TranslateModule.forRoot({
            defaultLanguage: "fr",
            loader: {
               provide: TranslateLoader,
               useFactory: HttpLoaderFactory,
               deps: [HttpClient],
            },
         })
      ),
   ],
};
