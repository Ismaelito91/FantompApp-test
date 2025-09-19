import {Component, computed, inject, input} from '@angular/core';
import {ThemeService} from "../../../service/theme.service";
import PageComponentModel from "../../../model/page-component.model";
import {PageTranslationPipe} from "../../../pipes/page-translation.pipe";
import {SafeHtmlPipe} from "../../../pipes/safe-html.pipe";
import {ButtonComponent} from "../button/button.component";
import {ComponentType} from "../../../model/enum/component-type.enum";
import {ComponentStatus} from "../../../model/enum/component-status.enum";
import {Device} from "../../../model/enum/device.enum";

@Component({
  selector: 'app-template-message',
   imports: [
      PageTranslationPipe,
      SafeHtmlPipe,
      ButtonComponent
   ],
  templateUrl: './template-message.component.html',
  styleUrl: './template-message.component.scss'
})
export class TemplateMessageComponent {
   private readonly themeService = inject(ThemeService);
   private readonly pageTranslationPipe = inject(PageTranslationPipe);
   data = input.required<PageComponentModel>();
   template_message: PageComponentModel =
      {
         id: 0,
         type: ComponentType.TEMPLATE_MESSAGE,
         status: ComponentStatus.PUBLISHED,
         translations: [{
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle:"📝 Exemple de mail à envoyer",
            description:"Madame, Monsieur,\n" +
               "\n" +
               "Des informations me concernant sont actuellement diffusées sur votre site internet sur les pages suivantes :\n" +
               "[Lien(s) Url du contenu à supprimer]\n" +
               "Aussi, en application des articles 21.1 et 17.1.c. du Règlement général sur la protection des données (RGPD), je vous remercie de supprimer les données personnelles suivantes me concernant :\n" +
               "[description des informations à supprimer] .\n" +
               "Je souhaite que ces informations soient supprimées car :\n" +
               "[motif de la suppression]\n" +
               "Je vous remercie également de faire le nécessaire pour que ces pages ne soient plus référencées par les moteurs de recherche (article 17.2 du RGPD).\n" +
               "Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n" +
               "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."
         }],
      };


   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });

   async copy() {
      try {
         if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(this.pageTranslationPipe.transform(this.data())?.description!);
         }
      } catch (err) {
         console.error("Erreur lors de la copie:", err);
      }
   }
}
