import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { Device } from '../../../../model/enum/device.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { ButtonBackComponent } from '../../../design-system/button-back/button-back.component';
import { ButtonCloseComponent } from "../../../design-system/button-close/button-close.component";
import { ButtonComponent } from "../../../design-system/button/button.component";
import { Card12Component } from "../../../design-system/card-12/card-12.component";
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { Card13Component } from "../../../design-system/card-13/card-13.component";

@Component({
   selector: 'app-reported-content',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, ButtonComponent, MatIconModule, MatTooltipModule, Card12Component, Card13Component],
   templateUrl: './reported-content.component.html',
   styleUrl: './reported-content.component.scss'
})
export class ReportedContentComponent {
   private readonly router = inject(Router);
   readonly dialog = inject(MatDialog);

   card_12: PageComponentModel = {
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
            description: "✅ Bravo, tu as eu un <strong>très bon réflexe</strong> en signalant le contenu à la plateforme. <br /><br />✅ Les réseaux sociaux reçoivent beaucoup de signalements et la modération prend du temps. Mais <strong>même sans réponse immédiate</strong> ton signalement est important.",
         }
      ]
   };

   goTo(url: string) {
      this.router.navigate([url]);
   }

   openDialog() {
      this.dialog.open(TutorialDialog, {
         backdropClass: 'blurred-backdrop'
      });
   }
}

@Component({
   selector: 'tutorial-dialog',
   templateUrl: 'tutorial-dialog.component.html',
   imports: [MatDialogContent, MatDialogClose, MatButtonModule, ButtonCloseComponent],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialDialog { }
