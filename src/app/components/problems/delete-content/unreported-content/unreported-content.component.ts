import {Component, inject} from '@angular/core';
import {ButtonBackComponent} from "../../../design-system/button-back/button-back.component";
import {TranslatePipe} from '@ngx-translate/core';
import {DividerComponent} from "../../../design-system/divider/divider.component";
import {Card12Component} from "../../../design-system/card-12/card-12.component";
import PageComponentModel from '../../../../model/page-component.model';
import {ComponentType} from '../../../../model/enum/component-type.enum';
import {ComponentStatus} from '../../../../model/enum/component-status.enum';
import {Device} from '../../../../model/enum/device.enum';
import {Card14Component} from "../../../design-system/card-14/card-14.component";
import {LanguageService} from '../../../../service/language.service';
import {CountryRegion} from '../../../../model/enum/country-region.enum';
import {SocialMedias} from "../../../../model/enum/socialMedias.enum";

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
         firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.TITLE"
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
               firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.INSTAGRAM.TITLE",
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
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.INSTAGRAM.LINK.TITLE",
                     description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.INSTAGRAM.LINK.DESCRIPTION",
                     staticImage: "assets/images/instagram-2.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  socialMedia: SocialMedias.INSTAGRAM,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.INSTAGRAM.BUTTON",
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
               firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.SNAPCHAT.TITLE",
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
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.SNAPCHAT.LINK.TITLE",
                     description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.SNAPCHAT.LINK.DESCRIPTION",
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
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.SNAPCHAT.MAIL.TITLE",
                     secondTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.SNAPCHAT.MAIL.DESCRIPTION",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  socialMedia: SocialMedias.SNAPCHAT,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.SNAPCHAT.BUTTON",
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
               firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.TIKTOK.TITLE",
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
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.TIKTOK.LINK.TITLE",
                     description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.TIKTOK.LINK.DESCRIPTION",
                     staticImage: "assets/images/tiktok.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  socialMedia: SocialMedias.TIKTOK,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.TIKTOK.BUTTON",
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
               firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.X.TITLE",
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
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.X.LINK.TITLE",
                     description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.X.LINK.DESCRIPTION",
                     staticImage: "assets/images/x.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  socialMedia: SocialMedias.X,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.X.BUTTON",
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
               firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.FACEBOOK.TITLE",
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
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.FACEBOOK.LINK.TITLE",
                     description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.FACEBOOK.LINK.DESCRIPTION",
                     staticImage: "assets/images/facebook.png",
                  }],
               },
               {
                  id: 0,
                  type: ComponentType.BUTTON_SECONDARY,
                  status: ComponentStatus.PUBLISHED,
                  socialMedia: SocialMedias.FACEBOOK,
                  translations: [{
                     id: 0,
                     countryRegion: this.languageService.language(),
                     devices: [Device.ANDROID, Device.IOS, Device.WEB],
                     firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.CONTACTS.SOCIAL_MEDIA.FACEBOOK.BUTTON",
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
         position: 1,
         translations: [
            {
               id: 0,
               countryRegion: this.languageService.language(),
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.P1.TITLE",
               secondTitle: this.getLocaleDateFromLang(dateAfterMonth),
               description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.P1.DESCRIPTION",
            }
         ]
      };
   }

   getLocaleDateFromLang(date: Date): string {
      const lang = this.languageService.language();
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
