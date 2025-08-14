import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'app-button-back',
   imports: [MatIconModule, MatButtonModule],
   templateUrl: './button-back.component.html',
   styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent {

   onClick() {
      history.back();
   }
}
