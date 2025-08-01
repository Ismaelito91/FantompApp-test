import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonVariant } from '../../../model/type/button-variant.type';
import { ButtonSize } from '../../../model/type/button-size.type';

@Component({
   selector: 'app-button',
   imports: [MatButtonModule, MatIconModule],
   templateUrl: './button.component.html',
   styleUrl: './button.component.scss'
})
export class ButtonComponent {
   label = input.required<string>();
   variant = input.required<ButtonVariant>();
   size = input<ButtonSize>('lg');

}
