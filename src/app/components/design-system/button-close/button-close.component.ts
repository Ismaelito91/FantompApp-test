import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ButtonSize } from '../../../model/type/button-size.type';

@Component({
   selector: 'app-button-close',
   imports: [MatIconModule, MatButtonModule, RouterLink],
   templateUrl: './button-close.component.html',
   styleUrl: './button-close.component.scss'
})
export class ButtonCloseComponent {
   link = input<string>();
   size = input<ButtonSize>('lg');
}
