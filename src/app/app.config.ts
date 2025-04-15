import {ApplicationConfig, inject, provideAppInitializer,
   provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {apiInterceptor} from "./interceptor/api.interceptor";
import {SettingService} from "./service/setting.service";
import {catchError, EMPTY, tap} from "rxjs";

import {provideOAuthClient} from "angular-oauth2-oidc";
import {AuthService} from "./service/auth.service";
import {authInterceptor} from "./interceptor/auth.interceptor";


function initSettings(_settingsService: SettingService, _authService: AuthService) {
   // On récupère d'abord la configuration globale de l'application depuis le backend
   return _settingsService.getSettings()
      .pipe(
         tap(async settings => {
            _settingsService.settings.set(settings);

            // Enfin on configure le fournisseur OIDC selon les valeurs récupérées
            await _authService.configure();

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
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes, withComponentInputBinding()),
      provideHttpClient(
         withInterceptors([authInterceptor, apiInterceptor])
      ),
      provideAppInitializer(() => initSettings(inject(SettingService), inject(AuthService))),
      provideOAuthClient({
         resourceServer: {
            allowedUrls: [],
            sendAccessToken: true
         }
      })
   ]
};
