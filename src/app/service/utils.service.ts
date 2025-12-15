import { Platform } from '@angular/cdk/platform';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
   providedIn: 'root'
})
export class UtilsService {
   private readonly router = inject(Router);
   private platform = inject(Platform);
   private readonly translateService = inject(TranslateService);
   public isBackgroundInert = signal<boolean>(false);

   goTo(url: string) {
      this.router.navigate([url]);
   }

   goToWithState(url: string | null, state: any) {
      if (!url) return;
      this.router.navigate([url], { state });
   }

   goToExternal(urlOrTranslationKey: string) {
      // Si c'est une URL (commence par http:// ou https://), l'utiliser directement
      // Sinon, traiter comme une clé de traduction
      const url = urlOrTranslationKey.startsWith('http://') || urlOrTranslationKey.startsWith('https://')
         ? urlOrTranslationKey
         : this.translateService.instant(urlOrTranslationKey);
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

   setBackgroundInert(value: boolean): void {
      this.isBackgroundInert.set(value);
   }
}
