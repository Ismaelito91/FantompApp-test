import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentStatus } from '../../../../../model/enum/component-status.enum';
import { ComponentType } from '../../../../../model/enum/component-type.enum';
import { Device } from '../../../../../model/enum/device.enum';
import PageComponentModel from '../../../../../model/page-component.model';
import { ButtonBackComponent } from '../../../../design-system/button-back/button-back.component';
import { ButtonComponent } from "../../../../design-system/button/button.component";
import { Card5Component } from "../../../../design-system/card-5/card-5.component";
import { DividerComponent } from "../../../../design-system/divider/divider.component";

@Component({
   selector: 'app-complaint',
   imports: [ButtonBackComponent, TranslatePipe, Card5Component, DividerComponent, ButtonComponent, MatIconModule, MatTooltipModule],
   templateUrl: './complaint.component.html',
   styleUrl: './complaint.component.scss'
})
export class ComplaintComponent {
   private readonly router = inject(Router);

   card_1: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_5,
      status: ComponentStatus.PUBLISHED,
      code: "code",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            description: "✅ Bravo, tu as eu un <strong>très bon réflexe</strong> en signalant le contenu à la plateforme. <br /><br />✅ Les réseaux sociaux reçoivent beaucoup de signalements et la modération prend du temps. Mais <strong>même sans réponse immédiate</strong> ton signalement est important.",
         }
      ],
      childrenIdList: []
   };

   goToExternal(url: string) {
      window.open(url, '_blank');
   }
}
