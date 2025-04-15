import { Component, signal } from '@angular/core';
import {DsfrHeaderModule, DsfrLink, DsfrModalModule} from "@edugouvfr/ngx-dsfr";
import {AuthService} from "../../service/auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
  selector: 'app-header',
  standalone: true,
   imports: [
      DsfrHeaderModule,
      DsfrModalModule
   ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

   readonly themeModalID = 'theme-modal-id';
   readonly headerToolsLinks = signal<DsfrLink[]>([
      { mode: 'button', label: 'Paramètres d\'affichage', customClass: 'fr-icon-theme-fill', ariaControls: this.themeModalID }
   ]);


   constructor(
         private _authService: AuthService
   ) {
      _authService.events()
         .pipe(takeUntilDestroyed())
         .subscribe(event => {
            if (event.type === 'user_profile_loaded') {
               this.headerToolsLinks.update(links => {
                  links.push({
                     mode: "link",
                     label: "Se déconnecter",
                     customClass: "fr-icon-lock-line",
                     routerLink: "/logout"
                  })
                  return links;
               });
            }
         })
   }


}
