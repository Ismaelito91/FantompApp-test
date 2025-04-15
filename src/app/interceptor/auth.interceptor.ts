import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {OAuthModuleConfig, OAuthService} from "angular-oauth2-oidc";
import {catchError, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   console.debug("authInterceptor");
   const oAuthService = inject(OAuthService);
   const moduleConfig = inject(OAuthModuleConfig);

   const url: string = req.url.toLowerCase();

   if (!moduleConfig || !moduleConfig.resourceServer || !moduleConfig.resourceServer.allowedUrls) return next(req);
   if (!checkUrl(url, moduleConfig)) return next(req);

   if (moduleConfig.resourceServer.sendAccessToken && oAuthService.getAccessToken()) {
      req = setTokenOnHeaders(oAuthService.getAccessToken(), req);
   }

   return next(req).pipe(
      catchError((err: HttpErrorResponse) => {
         if (err.status === 401) {
            oAuthService.logOut(false);
         }
         return throwError(() => err);
      }));
}

function setTokenOnHeaders(access_token: string, req: HttpRequest<unknown>) {
   console.debug("Setting tokens on headers");
   const token = 'Bearer ' + access_token;
   const headers = req.headers
      .set('Authorization', token);

   return req.clone({headers});
}

function checkUrl(url: string, moduleConfig: OAuthModuleConfig): boolean {
   if (moduleConfig.resourceServer.allowedUrls?.length === 0) {
      return true;
   }
   const found = moduleConfig.resourceServer.allowedUrls?.find(u => url.startsWith(u));
   return !!found;
}
