import { Component, input } from '@angular/core';

type Variant = 'primary' | 'success' | 'danger';

@Component({
   selector: 'app-badge',
   imports: [],
   templateUrl: './badge.component.html',
   styleUrl: './badge.component.scss'
})
export class BadgeComponent {
   title = input.required<string>();
   variant = input.required<Variant>();
}
