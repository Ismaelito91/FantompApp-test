import { Component, input } from '@angular/core';
import { BadgeSize } from '../../../model/type/badge-size.type';
import { BadgeVariant } from '../../../model/type/badge-variant.type';

@Component({
   selector: 'app-badge',
   imports: [],
   templateUrl: './badge.component.html',
   styleUrl: './badge.component.scss'
})
export class BadgeComponent {
   title = input.required<string>();
   variant = input.required<BadgeVariant>();
   size = input<BadgeSize>('sm');
}
