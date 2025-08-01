import { Component } from '@angular/core';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from "../../design-system/button/button.component";

@Component({
   selector: 'app-blur-image',
   imports: [ButtonBackComponent, MatButtonModule, ButtonComponent],
   templateUrl: './blur-image.component.html',
   styleUrl: './blur-image.component.scss'
})
export class BlurImageComponent {

}
