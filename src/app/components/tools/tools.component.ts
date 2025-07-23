import { animate, style, transition, trigger } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
   selector: "app-tools",
   standalone: true,
   imports: [MatIconModule],
   templateUrl: './tools.component.html',
   styleUrl: './tools.component.scss',
   animations: [
      trigger('slideInOut', [
         transition(':leave', [
            style({ transform: 'translateX(0)' }),
            animate('300ms ease-in-out', style({ transform: 'translateX(-100%)' }))
         ]),
         transition(':enter', [
            style({ transform: 'translateX(-100%)' }),
            animate('300ms ease-in-out', style({ transform: 'translateX(0)' }))
         ])
      ])
   ]
})
export class ToolsComponent {
   private readonly router = inject(Router);
   isLeaving = false;

   onClickTool(url: string) {
      this.isLeaving = true;

      setTimeout(() => {
         this.router.navigate(['tools', url]);
      }, 300); // Même durée que le transition de leaveToLeft (300ms)
   }
}
