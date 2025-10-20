import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SocialMedia } from '../../../model/enum/social-media.enum';
import PageComponentModel from '../../../model/page-component.model';
import { ButtonSize } from '../../../model/type/button-size.type';
import { ButtonVariant } from '../../../model/type/button-variant.type';
import { IconInfo } from '../../../model/type/icon-info.type';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { ModalFullComponent } from '../modal-full/modal-full.component';

@Component({
   selector: 'app-button',
   imports: [MatButtonModule, MatIconModule, SafeHtmlPipe],
   templateUrl: './button.component.html',
   styleUrl: './button.component.scss'
})
export class ButtonComponent {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly dialog = inject(MatDialog);
   data = input<PageComponentModel | null>(null);
   label = input.required<string>();
   variant = input.required<ButtonVariant>();
   size = input<ButtonSize>('lg');
   iconBeforeLabel = input<IconInfo>();
   iconAfterLabel = input<IconInfo>();

   handleClick(): void {
      if (this.data()) {
         if (this.data()!.modalId) {
            const modalPage = this.pageComponentUtils.getComponentById(this.data()!.modalId!);
            this.openDialog(ModalFullComponent, modalPage);
         } else {
            switch (this.data()!.socialMedia) {
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
   }


   private openDialog(DialogComponent: any, data: PageComponentModel | null): void {
      console.log('ModalFullComponent importé :', DialogComponent);

      if (DialogComponent && data) {
         this.dialog.open(DialogComponent, {
            width: '100vw',
            maxWidth: 'var(--max-width-viewport)',
            panelClass: 'modal-slideup',
            data
         });
      }
   }
}
