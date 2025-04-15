import {CanActivateFn, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = (): Observable<boolean
   | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
   const authService = inject(AuthService)
   return authService.isUserLoggedIn();
};
