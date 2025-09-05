import { Component, signal } from '@angular/core';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { TranslatePipe } from '@ngx-translate/core';
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { Card12Component } from "../../../design-system/card-12/card-12.component";
import PageComponentModel from '../../../../model/page-component.model';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { Device } from '../../../../model/enum/device.enum';

@Component({
   selector: 'app-unreported-content',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, Card12Component],
   templateUrl: './unreported-content.component.html',
   styleUrl: './unreported-content.component.scss'
})
export class UnreportedContentComponent {
   card_12: PageComponentModel = { translations: [] };
   dateAfterMonth = signal('');

   constructor() {
      const aujourdHui = new Date();

      // Clone la date pour éviter de modifier l’original
      const dateAfterMonth = new Date(aujourdHui);
      dateAfterMonth.setMonth(dateAfterMonth.getMonth() + 1);

      // Formate en français
      const dateTexte = new Intl.DateTimeFormat('fr-FR', {
         weekday: 'long',
         day: 'numeric',
         month: 'long',
         year: 'numeric'
      }).format(dateAfterMonth);

      this.card_12 = {
         id: 0,
         type: ComponentType.CARD_12,
         status: ComponentStatus.PUBLISHED,
         code: "code",
         position: 1,
         translations: [
            {
               id: 0,
               countryRegion: "FR",
               devices: [Device.ANDROID, Device.IOS, Device.WEB],
               firstTitle: "❗️La première étape est de signaler au réseau social ",
               secondTitle: dateTexte,
               description: "Garde bien toutes les preuves de ton signalement.  Si le réseau social ne répond pas au bout d’<strong>1 mois</strong>, tu peux porter plainte auprès de la CNIL le :",
            }
         ]
      };
   }

}
