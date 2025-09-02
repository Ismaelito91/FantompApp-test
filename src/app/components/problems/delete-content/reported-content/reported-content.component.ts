import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonBackComponent } from '../../../design-system/button-back/button-back.component';
import { Card5Component } from "../../../design-system/card-5/card-5.component";
import PageComponentModel from '../../../../model/page-component.model';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { Device } from '../../../../model/enum/device.enum';
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from "../../../design-system/button/button.component";

@Component({
   selector: 'app-reported-content',
   imports: [ButtonBackComponent, TranslatePipe, Card5Component, DividerComponent, ButtonComponent],
   templateUrl: './reported-content.component.html',
   styleUrl: './reported-content.component.scss'
})
export class ReportedContentComponent {

   t1: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_5,
      status: ComponentStatus.PUBLISHED,
      code: "xxxxxxxxxxxxxxxxxx",
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
}
