import { Platform } from '@angular/cdk/platform';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   private readonly router = inject(Router);
   private platform = inject(Platform);

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

   htmlToTextViaElement(html: string) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
   }

   isDesktop(): boolean {
     return this.platform.isBrowser && !this.platform.IOS && !this.platform.ANDROID;
   }
}
