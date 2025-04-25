import {
   ApplicationConfig, inject,
   isDevMode,
   provideAppInitializer,
   provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { catchError, EMPTY, tap } from "rxjs";
import { routes } from './app.routes';
import { apiInterceptor } from "./interceptor/api.interceptor";
import { SettingService } from "./service/setting.service";

import { provideServiceWorker } from '@angular/service-worker';


function initSettings(_settingsService: SettingService) {
   // On récupère d'abord la configuration globale de l'application depuis le backend
   return _settingsService.getSettings()
      .pipe(
         tap(async settings => {
            _settingsService.settings.set(settings);

            _settingsService.appStatus.set("initialized");
         }),
         catchError(() => {
            _settingsService.appStatus.set("failed");

            return EMPTY;
         }) // Requis, sinon c'est le catch du bootstrapApplication qui est pris en compte
      )
}

export const appConfig: ApplicationConfig = {
   providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, withComponentInputBinding()),
      provideHttpClient(
         withInterceptors([apiInterceptor])
      ),
      provideAppInitializer(() => initSettings(inject(SettingService))),
      provideServiceWorker('ngsw-worker.js', {
         enabled: !isDevMode(),
         registrationStrategy: 'registerWhenStable:30000'
      })
   ]
};
