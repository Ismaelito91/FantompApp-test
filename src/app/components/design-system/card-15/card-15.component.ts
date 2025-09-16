import {ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation} from '@angular/core';
import {ComponentType} from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import {PageTranslationPipe} from '../../../pipes/page-translation.pipe';
import {SafeHtmlPipe} from '../../../pipes/safe-html.pipe';
import {PageComponentUtilsService} from '../../../service/page-component-utils.service';
import {EnrichedLinkComponent} from "../enriched-link/enriched-link.component";
import {TileCallComponent} from "../tile-call/tile-call.component";
import {TileMessageComponent} from "../tile-message/tile-message.component";
import {ButtonComponent} from "../button/button.component";
import {TileMailComponent} from "../tile-mail/tile-mail.component";
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
   private dialogRef?: MatDialogRef<FacebookDialog>;
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }

   openDialog(): void {
      this.dialog.open(FacebookDialog, {
         width: '100vw',
         maxWidth: '100vw',
         panelClass: 'card-15-slide-dialog'
      });
   }

}


@Component({
   selector: 'facebook-dialog',
   templateUrl: 'facebook-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, EnrichedLinkComponent],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './facebook-dialog.scss',
   animations: [
      trigger('slideUpDown', [
         state('open', style({transform: 'translateY(0)', opacity: 1})),
         state('closed', style({transform: 'translateY(100%)', opacity: 0})),
         transition('void => open', [
            style({transform: 'translateY(100%)', opacity: 0}),
            animate('500ms ease-out')
         ]),
         transition('open => closed', [
            animate('500ms ease-in')
         ]),
      ])
   ]
})
export class FacebookDialog {
   private dialogRef = inject(MatDialogRef<FacebookDialog>);
   animationState: 'open' | 'closed' = 'open';

   enriched_link: PageComponentModel = {
      id: 0,
      type: ComponentType.ENRICHED_LINK,
      status: ComponentStatus.PUBLISHED,
      translations: [{
         id: 0,
         countryRegion: "FR",
         devices: [Device.ANDROID, Device.IOS, Device.WEB],
         firstTitle: "Formulaires de contact",
         description: "https://fr-fr.facebook.com/help/contact/954059743194940",
         staticImage: "assets/images/facebook.png",
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
