import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { Device } from '../../../../model/enum/device.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { Card15Component } from "../../../design-system/card-15/card-15.component";
import { ButtonComponent } from "../../../design-system/button/button.component";
import { Card13Component } from "../../../design-system/card-13/card-13.component";
import { UtilsService } from '../../../../service/utils.service';

@Component({
   selector: 'app-no-access',
   imports: [ButtonBackComponent, TranslatePipe, Card15Component, ButtonComponent, Card13Component],
   templateUrl: './no-access.component.html',
   styleUrl: './no-access.component.scss'
})
export class NoAccessComponent {
   readonly utilsService = inject(UtilsService);

   card_13: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_13,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "✉️ Contacter le réseau social",
            description: "Commence par contacter le réseau social pour dire que ton compte a été piraté.<br />➡️ Clique sur le lien du réseau que tu utilises.",
         }
      ]
   };

   card_15_1: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_15,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
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
               countryRegion: "FR",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Faire une demande d’assistance Instagram",
               description: "https://www.instagram.com/hacked/",
               staticImage: "assets/images/instagram-2.png",
            }],
         }
      ]
   };
   card_15_2: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_15,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
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
               countryRegion: "FR",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Envoyer une demande – Assistance Snapchat",
               description: "https://help.snapchat.com/hc/fr-fr/requests/new",
               staticImage: "assets/images/snapchat.png",
            }],
         }]
   };

   card_15_3: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_15,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
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
               countryRegion: "FR",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Signaler un problème | TikTok",
               description: "https://www.tiktok.com/legal/report/feedback",
               staticImage: "assets/images/tiktok.png",
            }],
         }
      ]
   };

   card_15_4: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_15,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
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
               countryRegion: "FR",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Le compte est piraté ou compromis",
               description: "https://help.x.com/fr/forms/account-access/regain-access/hacked-or-compromised",
               staticImage: "assets/images/x.png",
            }],
         }
      ]
   };

   card_15_5: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_15,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
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
               countryRegion: "FR",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "Comment effacer une conversation de mon fil d'actualités de Chat sur Snapchat ?",
               description: "https://www.facebook.com/hacked?ref=helpcenter",
               staticImage: "assets/images/facebook.png",
            }],
         }
      ]
   };

   card_14: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_14,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
         devices: [Device.ANDROID, Device.IOS, Device.WEB],
         firstTitle: "Contacts des réseaux sociaux"
      }],
      children: []
   };
}
