import {Injectable, signal} from '@angular/core';
import {AuthConfig, OAuthErrorEvent, OAuthService} from "angular-oauth2-oidc";
import UserModel from "../model/user.model";
import {SettingService} from "./setting.service";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   get user() {
      return this._user.asReadonly();
   }
   private _user = signal<UserModel | null>(null);

   authCodeFlowConfig!: AuthConfig;

   constructor(
      private _oauthService: OAuthService,
      private _settingService: SettingService,
      private _http: HttpClient
   ) { }

   listenEvents(): void {
      this._oauthService.events
         .pipe(take(1))
         .subscribe(event => {
            if (event instanceof OAuthErrorEvent) {
               console.error(event);
               this.logout();
            } else if (event.type === 'token_expires') {
               void this._oauthService.refreshToken();
            }
         });
   }

   events() {
      return this._oauthService.events;
   }

   isUserLoggedIn(): boolean {
      return this._oauthService.hasValidAccessToken() && this._oauthService.hasValidIdToken();
   }

   logout() {
      this._oauthService.logOut();
   }

   getUser() {
      return this._http.get<UserModel>("api/users/me");
   }

   async configure() {
      console.debug("Configuring OAuth");

      this.authCodeFlowConfig = {
         issuer: this._settingService.settings()?.sso.issuer,
         redirectUri: `${window.location.origin}`,
         clientId: this._settingService.settings()?.sso.clientID,
         scope: 'openid email profile offline_access roles',
         oidc: true,
         responseType: 'code'
      } as AuthConfig;

      this._oauthService.configure(this.authCodeFlowConfig);

      await this._oauthService.loadDiscoveryDocumentAndLogin();
      await this._oauthService.loadUserProfile();
      this.getUser()
         .pipe(take(1))
         .subscribe(user => {
            this._user.set(user);
         });
   }

}
