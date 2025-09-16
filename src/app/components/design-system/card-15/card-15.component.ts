import {ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation} from '@angular/core';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { EnrichedLinkComponent } from "../enriched-link/enriched-link.component";
import { TileCallComponent } from "../tile-call/tile-call.component";
import { TileMessageComponent } from "../tile-message/tile-message.component";
import { ButtonComponent } from "../button/button.component";
import { TileMailComponent } from "../tile-mail/tile-mail.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ButtonCloseComponent} from "../button-close/button-close.component";
import {DividerComponent} from "../divider/divider.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ComponentStatus} from "../../../model/enum/component-status.enum";
import {Device} from "../../../model/enum/device.enum";
import {TemplateMessageComponent} from "../template-message/template-message.component";

@Component({
   selector: 'app-card-15',
   imports: [PageTranslationPipe, SafeHtmlPipe, EnrichedLinkComponent, TileCallComponent, TileMessageComponent, ButtonComponent, TileMailComponent],
   templateUrl: './card-15.component.html',
   styleUrl: './card-15.component.scss'
})
export class Card15Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly dialog = inject(MatDialog);
   private dialogRef?: MatDialogRef<XDialog>;
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;
   
   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }

   openDialog(): void {
      this.dialog.open(XDialog, {
         width: '100vw',
         maxWidth: '100vw',
         panelClass: 'card-15-slide-dialog'
      });
   }
  
}


@Component({
   selector: 'x-dialog',
   templateUrl: 'x-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, EnrichedLinkComponent, TemplateMessageComponent],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './x-dialog.scss',
   animations: [
      trigger('slideUpDown', [
         state('open', style({ transform: 'translateY(0)', opacity: 1 })),
         state('closed', style({ transform: 'translateY(100%)', opacity: 0 })),
         transition('void => open', [
            style({ transform: 'translateY(100%)', opacity: 0 }),
            animate('500ms ease-out')
         ]),
         transition('open => closed', [
            animate('500ms ease-in')
         ]),
      ])
   ]
})
export class XDialog {
   private dialogRef = inject(MatDialogRef<XDialog>);
   animationState: 'open' | 'closed' = 'open';
   enriched_link: PageComponentModel =
      {
         id: 0,
         type: ComponentType.ENRICHED_LINK,
         status: ComponentStatus.PUBLISHED,
         translations: [{
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "Demandes liées à la politique de confidentialité de X",
            description: "https://help.x.com/fr/forms/privacy/question",
            staticImage: "assets/images/x.png",
         }],
      };
   template_message: PageComponentModel =
      {
         id: 0,
         type: ComponentType.TEMPLATE_MESSAGE,
         status: ComponentStatus.PUBLISHED,
         translations: [{
            id: 0,
            countryRegion: "FR",
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle:"📝 Exemple de mail à envoyer",
            description:"Madame, Monsieur,\n" +
               "\n" +
               "Des informations me concernant sont actuellement diffusées sur votre site internet sur les pages suivantes :\n" +
               "[Lien(s) Url du contenu à supprimer]\n" +
               "Aussi, en application des articles 21.1 et 17.1.c. du Règlement général sur la protection des données (RGPD), je vous remercie de supprimer les données personnelles suivantes me concernant :\n" +
               "[description des informations à supprimer] .\n" +
               "Je souhaite que ces informations soient supprimées car :\n" +
               "[motif de la suppression]\n" +
               "Je vous remercie également de faire le nécessaire pour que ces pages ne soient plus référencées par les moteurs de recherche (article 17.2 du RGPD).\n" +
               "Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n" +
               "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."
         }],
      };

   closeDialog() {
      this.animationState = 'closed';
   }

   onAnimationDone(event: any) {
      if (this.animationState === 'closed') {
         setTimeout(() => this.dialogRef.close(), 50);
      }
   }
}
