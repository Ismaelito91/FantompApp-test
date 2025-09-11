import { Component } from '@angular/core';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { Card16Component } from "../../../design-system/card-16/card-16.component";
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { Device } from '../../../../model/enum/device.enum';

@Component({
   selector: 'app-have-access',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, Card16Component],
   templateUrl: './have-access.component.html',
   styleUrl: './have-access.component.scss'
})
export class HaveAccessComponent {

   card_16_1_next = {
      id: 0,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         firstTitle: "À faire tout de suite",
      }],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_11,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            translations: [{
               id: 0,
               firstTitle: "Changer son mot de passe",
               description: "Crée tout de suite un mot de passe solide pour ton compte. FantomApp peut t’aider à vérifier si ton mot de passe est facilement trouvable.",
               staticImage: "assets/images/reco-password-change-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_11,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               firstTitle: "Activer la double authentification",
               description: "La double authentification ajoute une protection en plus à ton compte.Même si quelqu’un découvre ton mot de passe, il ne pourra pas se connecter sans un deuxième code (reçu par SMS ou via une appli).<br />👉 C’est comme une deuxième serrure sur ta porte.",
               staticImage: "assets/images/reco-double-auth-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_11,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               firstTitle: "Vérifier ses informations",
               description: "📲 Contact, publications, infos bancaires, si tu les avais indiquées, ont-elles été modifiées ?<br /><br />Si tu vois un numéro ou une adresse que tu ne connais pas :<ul style='list-style: disc; margin-left: 2rem;'><li>Fais une capture d’écran pour garder une preuve</li><li>Modifie-les tout de suite</li></ul>",
               staticImage: "assets/images/reco-infos-cover.png"
            }]
         },
         {
            id: 0,
            type: ComponentType.CARD_11,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [{
               id: 0,
               firstTitle: "Vérifier qui est connecté à son compte",
               description: "Va dans les paramètres de ton compte et déconnecte tous les appareils jusqu'ici autorisés.<br />❌ Si tu vois un appareil ou une connexion que tu ne reconnais pas :<ul style='list-style: disc; margin-left: 2rem;'><li>Fais une capture d’écran pour garder une preuve</li><li>Déconnecte-le tout de suite</li></ul>",
               staticImage: "assets/images/reco-localisation-cover.png"
            }]
         }
      ]
   }

   card_16_2_next = {
      id: 0,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         firstTitle: "À faire plus tard",
      }],
      children: [
         {
            id: 0,
            type: ComponentType.CARD_11,
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
            type: ComponentType.CARD_11,
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
            type: ComponentType.CARD_11,
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
            type: ComponentType.CARD_11,
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
            type: ComponentType.CARD_11,
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

   card_16_1: PageComponentModel = {
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
            firstTitle: "À faire tout de suite ⏱️",
            secondTitle: "danger",
            description: "IMPORTANT",
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
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Changer son mot de passe",
                  description: "Constitue immédiatement un mot de passe fort",
                  staticImage: "assets/images/reco-password-change-illu.jpg"
               }
            ]
         },
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
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Activer la double authentification",
                  description: "Ajoute un code de sécurité en plus",
                  staticImage: "assets/images/reco-double-auth-illu.jpg"
               }
            ]
         },
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
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Vérifier ses informations",
                  description: "Regarde si ton mail et ton numéro n’ont pas été changés",
                  staticImage: "assets/images/reco-infos-illu.jpg"
               }
            ]
         },
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
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Vérifier qui est connecté à son compte",
                  description: "Voir si des appareils inconnus sont connectés à ton compte",
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
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "À faire plus tard",
            secondTitle: "secondary",
            description: "SECONDAIRE",
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
            next: this.card_16_2_next,
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
            next: this.card_16_2_next,
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
            next: this.card_16_2_next,
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
            next: this.card_16_2_next,
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
