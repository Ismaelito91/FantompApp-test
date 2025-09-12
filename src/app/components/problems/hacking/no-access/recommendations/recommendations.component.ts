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

   card_16_next = {
      id: 0,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         firstTitle: "À faire plus tard",
      }],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            translations: [{
               id: 0,
               firstTitle: "Prévenir ses amis et contacts",
               description: "📢 Préviens tes contacts (amis, famille, etc.) que ton compte a été piraté.<br />⚠️ Ils pourraient recevoir des messages de la personne qui se fait passer pour toi. Dis-leur de ne pas répondre et de ne pas cliquer sur les liens.",
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
               firstTitle: "Changer ses autres mots de passe",
               description: "Si tu utilises le même mot de passe sur d’autres sites ou applis, modifie-le aussi là-bas.<br />👉 Ça évite que d’autres comptes soient piratés à leur tour.",
               staticImage: "assets/images/reco-other-passwords-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               firstTitle: "Prévenir la banque",
               description: "💳 Si tes <strong>informations bancaires</strong> (comme le numéro de carte) étaient accessibles sur le compte piraté, j’en parle tout de suite à un adulte.<br />Il faut <strong>prévenir la banque</strong> au plus vit e, et bloquer la carte si nécessaire pour éviter tout vol.",
               staticImage: "assets/images/reco-bank-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               firstTitle: "Mettre en place un gestionnaire de mot de passe",
               description: "🔐 Un gestionnaire de mots de passe, c’est une application ou un outil de ton téléphone qui garde tous tes mots de passe en sécurité.Il peut aussi en créer des très solides pour chaque site ou appli, et les remplir automatiquement quand tu te connectes.<br />👉 C’est comme un coffre-fort numérique pour tous tes comptes.",
               staticImage: "assets/images/reco-password-manager-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_19,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               firstTitle: "Ne jamais partager ses mots de passe",
               description: "Quelqu’un pourrait lire tes messages, publier à ta place ou te voler ton compte.<br />Ton mot de passe, c’est perso — comme le code de ton téléphone.",
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
            next: this.card_16_next,
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
            next: this.card_16_next,
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
            next: this.card_16_next,
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
            next: this.card_16_next,
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
            next: this.card_16_next,
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
