import { Injectable, Pipe, PipeTransform, inject } from '@angular/core';
import PageComponentTranslationModel from '../model/page-component-translation.model';
import PageComponentModel from '../model/page-component.model';
import { LanguageService } from '../service/language.service';

@Pipe({
   name: 'pageTranslation',
   standalone: true,
   pure: false // IMPORTANT pour que ça se mette à jour quand la langue change
})
@Injectable({
  providedIn: 'root',
})
export class PageTranslationPipe implements PipeTransform {
   private languageService = inject(LanguageService);

   transform(page: PageComponentModel | null | undefined): PageComponentTranslationModel | null {
      const lang = this.languageService.language(); // "FR", "ES", etc.
      if (!page?.translations) return null;

      return (
         page.translations.find(t => t.countryRegion === lang) ||
         page.translations[0] || // Sinon premiere translation
         null // Sinon rien
      );
   }
}
