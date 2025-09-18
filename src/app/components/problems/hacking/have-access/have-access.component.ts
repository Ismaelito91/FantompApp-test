import { Component, inject } from '@angular/core';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { Card16Component } from "../../../design-system/card-16/card-16.component";
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { Device } from '../../../../model/enum/device.enum';
import { LanguageService } from '../../../../service/language.service';

@Component({
   selector: 'app-have-access',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, Card16Component],
   templateUrl: './have-access.component.html',
   styleUrl: './have-access.component.scss'
})
export class HaveAccessComponent {
   private readonly languageService = inject(LanguageService);

   card_16_1_next : PageComponentModel = {
      id: 0,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: this.languageService.language(),
         firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.TITLE",
      }],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_18,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            showPasswordCheckBtn: true,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A1.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A1.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-password-change-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_18,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A2.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A2.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-double-auth-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_18,
            status: ComponentStatus.PUBLISHED,
            position: 3,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A3.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A3.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-infos-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_18,
            status: ComponentStatus.PUBLISHED,
            position: 4,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A4.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A4.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-localisation-cover.png"
            }]
         }
      ]
   }

   card_16_2_next : PageComponentModel = {
      id: 0,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: this.languageService.language(),
         firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.TITLE",
      }],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A1.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A1.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-prevent-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A2.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A2.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-other-passwords-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 3,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A3.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A3.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-bank-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 4,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A4.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A3.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-password-manager-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 5,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A5.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A5.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-no-share-password-cover.png"
            }]
         }
      ]
   }

   card_16_1: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_16,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.TITLE",
            secondTitle: "danger",
            description: "DESIGN_SYSTEM.TAG_UNCLICKABLE.IMPORTANT",
         }
      ],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            next: this.card_16_1_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A1.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A1.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-password-change-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 2,
            next: this.card_16_1_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A2.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A2.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-double-auth-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 3,
            next: this.card_16_1_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A3.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A3.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-infos-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 4,
            next: this.card_16_1_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A4.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.IMMEDIATELY.A4.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-localisation-illu.jpg"
               }
            ]
         }
      ]
   };

   card_16_2: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_16,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.TITLE",
            secondTitle: "secondary",
            description: "DESIGN_SYSTEM.TAG_UNCLICKABLE.SECONDARY",
         }
      ],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            next: this.card_16_2_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A1.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A1.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-prevent-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 2,
            next: this.card_16_2_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A2.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A2.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-other-passwords-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 3,
            next: this.card_16_2_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A3.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A3.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-bank-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 4,
            next: this.card_16_2_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A4.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A4.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-password-manager-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 5,
            next: this.card_16_2_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A5.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.HAVE_ACCESS.ACTIONS.LATER.A5.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-no-share-password-illu.jpg"
               }
            ]
         }
      ]
   };
}
