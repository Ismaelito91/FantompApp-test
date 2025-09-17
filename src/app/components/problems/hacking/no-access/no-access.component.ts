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
            firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.CONTACT.TITLE",
            description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.CONTACT.DESCRIPTION",
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
         firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.INSTAGRAM.TITLE",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.INSTAGRAM.LINK.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.INSTAGRAM.LINK.DESCRIPTION",
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
         firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.SNAPCHAT.TITLE",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.SNAPCHAT.LINK.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.SNAPCHAT.LINK.DESCRIPTION",
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
         firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.TIKTOK.TITLE",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.TIKTOK.LINK.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.TIKTOK.LINK.DESCRIPTION",
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
         firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.X.TITLE",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.X.LINK.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.X.LINK.DESCRIPTION",
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
         firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.FACEBOOK.TITLE",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.FACEBOOK.LINK.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.SOCIAL_MEDIA.FACEBOOK.LINK.DESCRIPTION",
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
