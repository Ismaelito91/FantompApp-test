import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonBackComponent } from '../../../../design-system/button-back/button-back.component';
import { ButtonComponent } from "../../../../design-system/button/button.component";

@Component({
   selector: 'app-complaint',
   imports: [ButtonBackComponent, TranslatePipe, ButtonComponent, MatIconModule, MatTooltipModule],
   templateUrl: './complaint.component.html',
   styleUrl: './complaint.component.scss'
})
export class ComplaintComponent {

   goToExternal(url: string) {
      window.open(url, '_blank');
   }
}
