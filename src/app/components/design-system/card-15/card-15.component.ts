import { Component, inject, input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentType } from '../../../model/enum/component-type.enum';
import { SocialMedia } from "../../../model/enum/social-media.enum";
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { ButtonComponent } from "../button/button.component";
import { EnrichedLinkComponent } from "../enriched-link/enriched-link.component";
import { ModalFullComponent } from '../modal-full/modal-full.component';
import { TileCallComponent } from "../tile-call/tile-call.component";
import { TileMailComponent } from "../tile-mail/tile-mail.component";
import { TileMessageComponent } from "../tile-message/tile-message.component";

@Component({
   selector: 'app-card-15',
   imports: [PageTranslationPipe, SafeHtmlPipe, EnrichedLinkComponent, TileCallComponent, TileMessageComponent, ButtonComponent, TileMailComponent, TranslatePipe],
   templateUrl: './card-15.component.html',
   styleUrl: './card-15.component.scss'
})
export class Card15Component {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly dialog = inject(MatDialog);
   data = input.required<PageComponentModel>();
   ComponentType = ComponentType;

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.data());
   }

   openDialogs(child: PageComponentModel): void {
      if (child.modalId) {
         const modalPage = this.pageComponentUtils.getComponentById(child.modalId);
         this.openDialog(ModalFullComponent, modalPage);
      } else {
         switch (child.socialMedia) {
            case SocialMedia.FACEBOOK:
               const modalFacebook = this.pageComponentUtils.getComponentByCode('modal_facebook');
               this.openDialog(ModalFullComponent, modalFacebook);
               break;
            case SocialMedia.INSTAGRAM:
               const modalInstagram = this.pageComponentUtils.getComponentByCode('modal_instagram');
               this.openDialog(ModalFullComponent, modalInstagram);
               break;
            case SocialMedia.TIKTOK:
               const modalTiktok = this.pageComponentUtils.getComponentByCode('modal_tiktok');
               this.openDialog(ModalFullComponent, modalTiktok);
               break;
            case SocialMedia.SNAPCHAT:
               const modalSnapchat = this.pageComponentUtils.getComponentByCode('modal_snapchat');
               this.openDialog(ModalFullComponent, modalSnapchat);
               break;
            case SocialMedia.X:
               const modalX = this.pageComponentUtils.getComponentByCode('modal_x');
               this.openDialog(ModalFullComponent, modalX);
               break;
            default:
               console.warn('Aucun dialog ne correspond aux données');
         }
      }
   }


   private openDialog(DialogComponent: any, data: PageComponentModel | null): void {
      if (data) {
         this.dialog.open(DialogComponent, {
            width: '100vw',
            maxWidth: 'var(--max-width-viewport)',
            panelClass: 'modal-slideup',
            data
         });
      }
   }
}
