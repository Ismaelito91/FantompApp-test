import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentStatus } from "../../../model/enum/component-status.enum";
import { ComponentType } from '../../../model/enum/component-type.enum';
import { Device } from "../../../model/enum/device.enum";
import { SocialMedias } from "../../../model/enum/socialMedias.enum";
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { LanguageService } from '../../../service/language.service';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { ButtonCloseComponent } from "../button-close/button-close.component";
import { ButtonComponent } from "../button/button.component";
import { DividerComponent } from "../divider/divider.component";
import { EnrichedLinkComponent } from "../enriched-link/enriched-link.component";
import { ModalFullComponent } from '../modal-full/modal-full.component';
import { TemplateMessageComponent } from "../template-message/template-message.component";
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
         if (child?.socialMedia === SocialMedias.FACEBOOK) {
            this.openDialog(FacebookDialog, null);
         } else if (child?.socialMedia === SocialMedias.INSTAGRAM) {
            this.openDialog(InstaDialog, null);
         } else if (child?.socialMedia === SocialMedias.TIKTOK) {
            this.openDialog(TiktokDialog, null);
         } else if (child?.socialMedia === SocialMedias.SNAPCHAT) {
            this.openDialog(SnapchatDialog, null);
         } else if (child?.socialMedia === SocialMedias.X) {
            this.openDialog(XDialog, null);
         } else {
            console.warn('Aucun dialog ne correspond aux données');
         }
      }
   }


   private openDialog(DialogComponent: any, data: PageComponentModel | null): void {
      this.dialog.open(DialogComponent, {
            width: '100vw',
            maxWidth: '100vw',
            panelClass: 'card-15-slide-dialog',
            data
         }
      );
   }

}


@Component({
   selector: 'facebook-dialog',
   templateUrl: 'facebook-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, EnrichedLinkComponent, TranslatePipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './facebook-dialog.scss',
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
export class FacebookDialog {
   private dialogRef = inject(MatDialogRef<FacebookDialog>);
   private readonly languageService = inject(LanguageService);

   animationState: 'open' | 'closed' = 'open';

   enriched_link: PageComponentModel = {
      id: 0,
      type: ComponentType.ENRICHED_LINK,
      status: ComponentStatus.PUBLISHED,
      socialMedia: SocialMedias.FACEBOOK,
      translations: [{
         id: 0,
         countryRegion: this.languageService.language(),
         devices: [Device.ANDROID, Device.IOS, Device.WEB],
         firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.FACEBOOK.ENRICHED_LINK.TITLE",
         description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.FACEBOOK.ENRICHED_LINK.DESCRIPTION",
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

@Component({
   selector: 'snapchat-dialog',
   templateUrl: 'snapchat-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, TileMailComponent, TemplateMessageComponent, TranslatePipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './snapchat-dialog.scss',
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
export class SnapchatDialog {
   private dialogRef = inject(MatDialogRef<SnapchatDialog>);
   private readonly languageService = inject(LanguageService);
   animationState: 'open' | 'closed' = 'open';
   tile_mail: PageComponentModel =
      {
         id: 0,
         type: ComponentType.TILE_MAIL,
         status: ComponentStatus.PUBLISHED,
         socialMedia: SocialMedias.SNAPCHAT,
         translations: [{
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            secondTitle: "dpo@snapchat.com",
         }],
      };
   template_message: PageComponentModel =
      {
         id: 0,
         type: ComponentType.TEMPLATE_MESSAGE,
         status: ComponentStatus.PUBLISHED,
         translations: [{
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.DESCRIPTION",
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

@Component({
   selector: 'tiktok-dialog',
   templateUrl: 'tiktok-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, TemplateMessageComponent, EnrichedLinkComponent, TranslatePipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './tiktok-dialog.scss',
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
export class TiktokDialog {
   private dialogRef = inject(MatDialogRef<TiktokDialog>);
   private readonly languageService = inject(LanguageService);
   animationState: 'open' | 'closed' = 'open';

   enriched_link: PageComponentModel = {
      id: 0,
      type: ComponentType.ENRICHED_LINK,
      status: ComponentStatus.PUBLISHED,
      socialMedia: SocialMedias.TIKTOK,
      translations: [{
         id: 0,
         countryRegion: this.languageService.language(),
         devices: [Device.ANDROID, Device.IOS, Device.WEB],
         firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TIKTOK.ENRICHED_LINK.TITLE",
         description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TIKTOK.ENRICHED_LINK.DESCRIPTION",
         staticImage: "assets/images/tiktok.png",
      }],
   };

   template_message: PageComponentModel =
      {
         id: 0,
         type: ComponentType.TEMPLATE_MESSAGE,
         status: ComponentStatus.PUBLISHED,
         translations: [{
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.DESCRIPTION",
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

@Component({
   selector: 'insta-dialog',
   templateUrl: 'insta-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, EnrichedLinkComponent, TranslatePipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './insta-dialog.scss',
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
export class InstaDialog {
   private dialogRef = inject(MatDialogRef<InstaDialog>);
   private readonly languageService = inject(LanguageService);
   animationState: 'open' | 'closed' = 'open';
   enriched_link: PageComponentModel =
      {
         id: 0,
         type: ComponentType.ENRICHED_LINK,
         status: ComponentStatus.PUBLISHED,
         socialMedia: SocialMedias.INSTAGRAM,
         translations: [{
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.INSTAGRAM.ENRICHED_LINK.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.INSTAGRAM.ENRICHED_LINK.DESCRIPTION",
            staticImage: "assets/images/instagram-2.png",
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

@Component({
   selector: 'x-dialog',
   templateUrl: 'x-dialog.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, EnrichedLinkComponent, TemplateMessageComponent, TranslatePipe],
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
   private readonly languageService = inject(LanguageService);
   animationState: 'open' | 'closed' = 'open';
   enriched_link: PageComponentModel =
      {
         id: 0,
         type: ComponentType.ENRICHED_LINK,
         status: ComponentStatus.PUBLISHED,
         socialMedia: SocialMedias.X,
         translations: [{
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TIKTOK.ENRICHED_LINK.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TIKTOK.ENRICHED_LINK.DESCRIPTION",
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
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.UNREPORTED_CONTENT.TEMPLATE_MESSAGE.DESCRIPTION",
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
