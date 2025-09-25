import { animate, state, style, transition, trigger } from "@angular/animations";
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslatePipe } from '@ngx-translate/core';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { ButtonCloseComponent } from "../button-close/button-close.component";
import { DividerComponent } from "../divider/divider.component";

@Component({
   selector: 'app-modal-full',
   templateUrl: 'modal-full.component.html',
   imports: [MatButtonModule, ButtonCloseComponent, DividerComponent, TranslatePipe, PageTranslationPipe, SafeHtmlPipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
   styleUrl: './modal-full.component.scss',
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
export class ModalFullComponent {
   readonly data: PageComponentModel = inject(MAT_DIALOG_DATA);
   private dialogRef = inject(MatDialogRef<ModalFullComponent>);
   animationState: 'open' | 'closed' = 'open';

   closeDialog() {
      this.animationState = 'closed';
   }

   onAnimationDone(event: any) {
      if (this.animationState === 'closed') {
         setTimeout(() => this.dialogRef.close(), 50);
      }
   }
}
