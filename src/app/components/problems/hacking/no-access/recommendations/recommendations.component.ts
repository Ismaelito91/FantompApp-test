import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonBackComponent } from "../../../../design-system/button-back/button-back.component";
import { Card13Component } from "../../../../design-system/card-13/card-13.component";
import PageComponentModel from '../../../../../model/page-component.model';
import { ComponentType } from '../../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../../model/enum/component-status.enum';
import { Device } from '../../../../../model/enum/device.enum';
import { Card16Component } from "../../../../design-system/card-16/card-16.component";
import { LanguageService } from '../../../../../service/language.service';

@Component({
   selector: 'app-recommendations',
   imports: [ButtonBackComponent, TranslatePipe, Card13Component, Card16Component],
   templateUrl: './recommendations.component.html',
   styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent {
   private readonly languageService = inject(LanguageService);

   card_13: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_13,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.TITLE",
            description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.DESCRIPTION",
         }
      ]
   };

   card_16_next: PageComponentModel = {
      id: 0,
      status: ComponentStatus.PUBLISHED,
      translations: [],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            translations: [{
               id: 0,
               countryRegion: this.languageService.language(),
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A1.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A1.LONG_DESCRIPTION",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A2.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A2.LONG_DESCRIPTION",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A3.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A3.LONG_DESCRIPTION",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A4.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A3.LONG_DESCRIPTION",
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
               firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A5.TITLE",
               description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A5.LONG_DESCRIPTION",
               staticImage: "assets/images/reco-no-share-password-cover.png"
            }]
         }
      ]
   }

   card_16: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_16,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            next: this.card_16_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A1.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A1.SHORT_DESCRIPTION",
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
            next: this.card_16_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A2.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A2.SHORT_DESCRIPTION",
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
            next: this.card_16_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A3.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A3.SHORT_DESCRIPTION",
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
            next: this.card_16_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A4.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A4.SHORT_DESCRIPTION",
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
            next: this.card_16_next,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A5.TITLE",
                  description: "PROBLEMS.HACKING.RESULTS.NO_ACCESS.RECOMMENDATIONS.ACTIONS.LATER.A5.SHORT_DESCRIPTION",
                  staticImage: "assets/images/reco-no-share-password-illu.jpg"
               }
            ]
         }
      ]
   };
}
