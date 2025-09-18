import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { Card12Component } from "../../../design-system/card-12/card-12.component";
import PageComponentModel from '../../../../model/page-component.model';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { Device } from '../../../../model/enum/device.enum';
import { Card1Component } from "../../../design-system/card-1/card-1.component";
import { Card14Component } from "../../../design-system/card-14/card-14.component";
import { LanguageService } from '../../../../service/language.service';
import { CountryRegion } from '../../../../model/enum/country-region.enum';
import {MatDialog, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ButtonCloseComponent} from "../../../design-system/button-close/button-close.component";
import {TutorialDialog} from "../reported-content/reported-content.component";

@Component({
   selector: 'app-unreported-content',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, Card12Component, Card14Component],
   templateUrl: './unreported-content.component.html',
   styleUrl: './unreported-content.component.scss'
})
export class UnreportedContentComponent {
   private readonly languageService = inject(LanguageService);

   card_12: PageComponentModel = { translations: [] };
   card_14: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_14,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: this.languageService.language(),
         devices: [Device.ANDROID, Device.IOS, Device.WEB],
         firstTitle: "Contacts des réseaux sociaux"
      }],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_15,
            status: ComponentStatus.PUBLISHED,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Instagram",
               staticImage: "assets/images/instagram.png",
            }],
            children: [
               {
                  id: 0,
                  type: ComponentType.ENRICHED_LINK,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Signaler une violation de votre vie privée sur Instagram ou Threads",
                     description: "https://help.instagram.com/contact/1716697545776727",
                     staticImage: "assets/images/instagram-2.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Comment remplir le formulaire ?",
                  }],
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_15,
            status: ComponentStatus.PUBLISHED,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Snapchat",
               staticImage: "assets/images/snapchat.png",
            }],
            children: [
               {
                  id: 0,
                  type: ComponentType.ENRICHED_LINK,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Envoyer une demande – Assistance Snapchat",
                     description: "https://help.snapchat.com/hc/fr-fr/requests/new",
                     staticImage: "assets/images/snapchat.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.TILE_MAIL,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Contacter Snapchat par mail",
                     secondTitle: "dpo@snapchat.com",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Voir un exemple de mail",
                  }],
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_15,
            status: ComponentStatus.PUBLISHED,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "TikTok",
               staticImage: "assets/images/tiktok.png",
            }],
            children: [
               {
                  id: 0,
                  type: ComponentType.ENRICHED_LINK,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Envoyer une demande liée à la confidentialité",
                     description: "https://www.tiktok.com/legal/report/privacy/webform/fr",
                     staticImage: "assets/images/tiktok.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Comment remplir le formulaire ?",
                  }],
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_15,
            status: ComponentStatus.PUBLISHED,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "X",
               staticImage: "assets/images/x.png",
            }],
            children: [
               {
                  id: 0,
                  type: ComponentType.ENRICHED_LINK,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Demandes liées à la politique de confidentialité de X",
                     description: "https://help.x.com/fr/forms/privacy/question",
                     staticImage: "assets/images/x.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Comment remplir le formulaire ?",
                  }],
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_15,
            status: ComponentStatus.PUBLISHED,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Facebook",
               staticImage: "assets/images/facebook.png",
            }],
            children: [
               {
                  id: 0,
                  type: ComponentType.ENRICHED_LINK,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Formulaires de contact",
                     description: "https://fr-fr.facebook.com/help/contact/954059743194940",
                     staticImage: "assets/images/facebook.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "Comment remplir le formulaire ?",
                  }],
               }
            ]
         }
      ]
   };

   constructor() {
      const today = new Date();

      // Clone la date pour éviter de modifier l’original
      const dateAfterMonth = new Date(today);
      dateAfterMonth.setMonth(dateAfterMonth.getMonth() + 1);

      this.card_12 = {
         id: 0,
         type: ComponentType.CARD_12,
         status: ComponentStatus.PUBLISHED,
         code: "code",
         position: 1,
         translations: [
            {
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "❗️La première étape est de signaler au réseau social",
               secondTitle: this.getLocaleDateFromLang('FR', dateAfterMonth),
               description: "Garde bien toutes les preuves de ton signalement.  Si le réseau social ne répond pas au bout d’<strong>1 mois</strong>, tu peux porter plainte auprès de la CNIL le :",
            },
            {
               id: 0,
               countryRegion: "IE",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "❗️La première étape est de signaler au réseau social IE",
               secondTitle: this.getLocaleDateFromLang('IE', dateAfterMonth),
               description: "Garde bien toutes les preuves de ton signalement.  Si le réseau social ne répond pas au bout d’<strong>1 mois</strong>, tu peux porter plainte auprès de la CNIL le : IE",
            },
            {
               id: 0,
               countryRegion: "HU",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "❗️La première étape est de signaler au réseau social HU",
               secondTitle: this.getLocaleDateFromLang('HU', dateAfterMonth),
               description: "Garde bien toutes les preuves de ton signalement.  Si le réseau social ne répond pas au bout d’<strong>1 mois</strong>, tu peux porter plainte auprès de la CNIL le : HU",
            }
         ]
      };
   }

   getLocaleDateFromLang(lang: keyof typeof CountryRegion, date: Date): string {
      let locale: string;
      switch (lang) {
         case 'FR':
            locale = 'fr-FR';
            break;
         case 'IE':
            locale = 'en-IE';
            break;
         case 'ES':
            locale = 'es-ES';
            break;
         case 'CT':
            locale = 'ca';
            break;
         case 'LU':
            locale = 'lb-LU';
            break;
         case 'DK':
            locale = 'da-DK';
            break;
         case 'HU':
            locale = 'hu-HU';
            break;
         case 'PT':
            locale = 'pt-PT';
            break;
         case 'PL':
            locale = 'pl-PL';
            break;
         case 'GR':
            locale = 'el-GR';
            break;
         case 'XX':
            locale = 'en';
            break;
         default:
            locale = 'fr-FR';
      }

      const dateTexte = new Intl.DateTimeFormat(locale, {
         weekday: 'long',
         day: 'numeric',
         month: 'long',
         year: 'numeric'
      }).format(date);

      return dateTexte;
   }
}
