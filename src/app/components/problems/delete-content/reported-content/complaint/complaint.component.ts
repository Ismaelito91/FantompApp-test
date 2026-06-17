import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../../../../../service/utils.service';
import { ButtonBackComponent } from '../../../../design-system/button-back/button-back.component';
import { ButtonComponent } from "../../../../design-system/button/button.component";

const COMPLAINT_LINK_KEY = 'PROBLEMS.DELETE_CONTENT.RESULTS.REPORTED_CONTENT.COMPLAINT.LINK';

@Component({
   selector: 'app-complaint',
   imports: [ButtonBackComponent, TranslatePipe, ButtonComponent, MatIconModule, MatTooltipModule],
   templateUrl: './complaint.component.html',
   styleUrl: './complaint.component.scss'
})
export class ComplaintComponent {
   readonly utilsService = inject(UtilsService);
   private readonly translateService = inject(TranslateService);

   get hasComplaintLink(): boolean {
      return this.translateService.instant(COMPLAINT_LINK_KEY) !== COMPLAINT_LINK_KEY;
   }
}
