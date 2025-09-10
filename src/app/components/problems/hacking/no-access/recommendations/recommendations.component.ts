import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonBackComponent } from "../../../../design-system/button-back/button-back.component";
import { Card13Component } from "../../../../design-system/card-13/card-13.component";
import PageComponentModel from '../../../../../model/page-component.model';
import { ComponentType } from '../../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../../model/enum/component-status.enum';
import { Device } from '../../../../../model/enum/device.enum';
import { Card16Component } from "../../../../design-system/card-16/card-16.component";

@Component({
   selector: 'app-recommendations',
   imports: [ButtonBackComponent, TranslatePipe, Card13Component, Card16Component],
   templateUrl: './recommendations.component.html',
   styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent {
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
            firstTitle: "👍 Suivre ces recommandations",
            description: "Même si tu n’as plus accès à ton compte, tu peux encore agir. Ces gestes t’aideront à te protéger et éviter que ça se reproduise.",
         }
      ]
   };

   card_16: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_16,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
         }
      ],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Prévenir ses amis et contacts",
                  description: "Ils pourraient recevoir des messages bizarres",
                  staticImage: "assets/images/reco-prevent-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Changer ses autres mots de passe",
                  description: "Protège tes autres comptes",
                  staticImage: "assets/images/reco-other-passwords-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Prévenir la banque ",
                  description: "Agir si tes infos bancaires étaient sur ton compte",
                  staticImage: "assets/images/reco-bank-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Utiliser un gestionnaire de mot de passe",
                  description: "Pour sécuriser tes mots de passe",
                  staticImage: "assets/images/reco-password-manager-illu.jpg"
               }
            ]
         },
         {
            id: 0,
            type: ComponentType.CARD_17,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Ne jamais partager ses mots de passe",
                  description: "Le mieux est de les garder pour soi",
                  staticImage: "assets/images/reco-no-share-password-illu.jpg"
               }
            ]
         }
      ]
   };
}
