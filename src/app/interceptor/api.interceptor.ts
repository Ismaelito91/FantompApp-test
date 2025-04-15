import {inject} from '@angular/core';
import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';
import ApiErrorModel from "../model/api-error.model";
import {LoaderService} from "../service/loader.service";

export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
   console.debug("apiInterceptor", req);
   const router = inject(Router);
   const loader = inject(LoaderService);
   const ERROR_PAGE = "/error";

   // Redirige toutes les erreurs 4XX et 5XX sauf 400 et 500 (modifier à sa convenance)
   const REDIRECTED_ERRORS = Array.from({length: 200}, (_, i) => i + 400)
      .filter(code => ![400].includes(code));

   loader.hide();

   return next(req).pipe(
      catchError((err: HttpErrorResponse) => {
         if (err.status === 0) {
            console.error("Une erreur client est survenue", err, req);
         } else {
            const error = err.error as ApiErrorModel;
            console.error("Une erreur du serveur est survenue", err, req);
            console.error("ApiError: ", error);
            if (REDIRECTED_ERRORS.includes(err.status)) {
               console.debug(`Redirection vers ${ERROR_PAGE}/${err.status}`)
               void router.navigateByUrl(`${ERROR_PAGE}/${err.status}`, {
                  state: {
                     error
                  }
               })
            }
         }

         // Return an observable with a user-facing error message.
         return throwError(() => err);
      })
   );
}
