import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   private readonly router = inject(Router);

   goTo(url: string) {
      this.router.navigate([url]);
   }

   goToWithState(url: string | null, state: any) {
      if (!url) return;
      this.router.navigate([url], { state });
   }

   goToExternal(url: string) {
      window.open(url, '_blank');
   }
}
