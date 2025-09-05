import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { Device } from '../../../../model/enum/device.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../../design-system/button/button.component";
import { Card4Component } from "../../../design-system/card-4/card-4.component";
import { Card5Component } from "../../../design-system/card-5/card-5.component";
import { DividerComponent } from "../../../design-system/divider/divider.component";

@Component({
   selector: 'app-violent-content',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, Card4Component, Card5Component, ButtonComponent],
   templateUrl: './violent-content.component.html',
   styleUrl: './violent-content.component.scss'
})
export class ViolentContentComponent {
   private readonly router = inject(Router);
   reported: boolean = false;

   card_4: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_4,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "Tu n’es pas seul",
            description: "La situation peut être très compliquée à vivre pour toi, mais dans la vie, on est jamais seul ! Il y a des solutions pour changer les choses et des personnes pour t’accompagner dans cette mésaventure.",
         }
      ],
   };

   card_5_1: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_5,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 2,
      translations: [
         {
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "Trouver du soutien",
            description: "Tu peux en parler à tes parents, un ami, un membre de ta famille, un professeur ou à un adulte dans lequel tu as confiance. 🤝 Des professionnels peuvent aussi t’aider au 3018. Anonyme, confidentiel et gratuit de 9h00 à 23h00, 7j/7. Appelle jusqu’à ce que tu aies une réponse.",
         }
      ],
      children: [
         {
            id: 0,
            type: ComponentType.ENRICHED_LINK,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Parler avec le 3018",
                  description: "https://e-enfance.org/besoin-daide/",
                  staticImage: "assets/images/3018.png"
               }
            ],
         },
         {
            id: 0,
            type: ComponentType.TILE_CALL,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "3018",
                  staticImage: "assets/images/3018.png"
               }
            ],
         },
         {
            id: 0,
            type: ComponentType.TILE_MESSAGE,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "3018",
                  staticImage: "assets/images/whatsapp.png"
               }
            ],
         },
      ]
   };

   card_5_2: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_5,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 2,
      translations: [
         {
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "Déposer plainte",
            description: "La plainte permet de signaler à la justice les faits dont tu es victime. Tu peux déposer plainte en allant voir la police ou la gendarmerie, ou par courrier.",
         }
      ],
      children: [
         {
            id: 0,
            type: ComponentType.ENRICHED_LINK,
            status: ComponentStatus.PUBLISHED,
            code: "code",
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: "FR",
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle: "Ma Sécurité | Ma Sécurité",
                  description: "https://www.masecurite.interieur.gouv.fr/fr",
                  staticImage: "assets/images/mariane.png"
               }
            ],
         }
      ]
   };

   constructor() {
      const state = history.state as { reported: boolean };
      this.reported = state.reported;
   }

   goTo() {
      const url = this.reported ? "/delete-content/reported-content" : "/delete-content/unreported-content";
      this.router.navigate([url]);
   }
}
