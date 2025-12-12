import { Component, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { SocialMedia } from "../../../model/enum/social-media.enum";
import PageComponentModel from "../../../model/page-component.model";
import { ButtonSize } from "../../../model/type/button-size.type";
import { ButtonVariant } from "../../../model/type/button-variant.type";
import { IconInfo } from "../../../model/type/icon-info.type";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageComponentUtilsService } from "../../../service/page-component-utils.service";

@Component({
   selector: "app-button",
   standalone: true,
   imports: [MatButtonModule, MatIconModule, SafeHtmlPipe],
   templateUrl: "./button.component.html",
   styleUrl: "./button.component.scss",
})
export class ButtonComponent {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly dialog = inject(MatDialog);
   data = input<PageComponentModel | null>(null);
   label = input.required<string>();
   variant = input.required<ButtonVariant>();
   size = input<ButtonSize>("lg");
   iconBeforeLabel = input<IconInfo>();
   iconAfterLabel = input<IconInfo>();

   handleClick(): void {
      if (this.data()) {
         if (this.data()!.modalId) {
            const modalPage = this.pageComponentUtils.getComponentById(
               this.data()!.modalId!
            );
            this.openDialog(modalPage);
         } else {
            switch (this.data()!.socialMedia) {
               case SocialMedia.FACEBOOK:
                  const modalFacebook =
                     this.pageComponentUtils.getComponentByCode(
                        "modal_facebook"
                     );
                  this.openDialog(modalFacebook);
                  break;
               case SocialMedia.INSTAGRAM:
                  const modalInstagram =
                     this.pageComponentUtils.getComponentByCode(
                        "modal_instagram"
                     );
                  this.openDialog(modalInstagram);
                  break;
               case SocialMedia.TIKTOK:
                  const modalTiktok =
                     this.pageComponentUtils.getComponentByCode("modal_tiktok");
                  this.openDialog(modalTiktok);
                  break;
               case SocialMedia.SNAPCHAT:
                  const modalSnapchat =
                     this.pageComponentUtils.getComponentByCode(
                        "modal_snapchat"
                     );
                  this.openDialog(modalSnapchat);
                  break;
               case SocialMedia.X:
                  const modalX =
                     this.pageComponentUtils.getComponentByCode("modal_x");
                  this.openDialog(modalX);
                  break;
               default:
                  console.warn("Aucun dialog ne correspond aux données");
            }
         }
      }
   }

   private async openDialog(
      data: PageComponentModel | null
   ): Promise<void> {
      if (data) {
         // Import dynamique pour éviter la dépendance circulaire
         const { ModalFullComponent } = await import("../modal-full/modal-full.component");
         
         this.dialog.open(ModalFullComponent, {
            width: "100vw",
            maxWidth: "var(--max-width-viewport)",
            panelClass: "modal-slideup",
            data,
         });
      }
   }
}
