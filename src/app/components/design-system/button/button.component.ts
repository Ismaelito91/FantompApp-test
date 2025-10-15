import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonSize } from '../../../model/type/button-size.type';
import { ButtonVariant } from '../../../model/type/button-variant.type';
import { IconInfo } from '../../../model/type/icon-info.type';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
   selector: 'app-button',
   imports: [MatButtonModule, MatIconModule, SafeHtmlPipe],
   templateUrl: './button.component.html',
   styleUrl: './button.component.scss'
})
export class ButtonComponent {
   label = input.required<string>();
   variant = input.required<ButtonVariant>();
   size = input<ButtonSize>('lg');
   iconBeforeLabel = input<IconInfo>();
   iconAfterLabel = input<IconInfo>();
}
