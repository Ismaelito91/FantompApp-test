import { Component } from '@angular/core';
import { ButtonCloseComponent } from "../../../design-system/button-close/button-close.component";
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const moveInTopWithFlipYAnimation = trigger('moveInTopWithFlipY', [
   transition(':enter', [
      animate(
         '2000ms 200ms cubic-bezier(0.22, 1, 0.36, 1)', // ralentir + effet spring
         keyframes([
            style({
               opacity: 0,
               transform: 'perspective(1000px) rotateY(-90deg) translateY(-20px)',
               transformOrigin: 'center',
               offset: 0
            }),
            style({
               opacity: 0.7,
               transform: 'perspective(1000px) rotateY(10deg) translateY(-10px)',
               offset: 0.6
            }),
            style({
               opacity: 1,
               transform: 'perspective(1000px) rotateY(0deg) translateY(0)',
               offset: 1
            })
         ])
      )
   ])
]);

export const bounceOnceDownAnimation = trigger('bounceOnceDown', [
  transition('* => active', [
    animate(
      '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)', // ease-out smooth
      keyframes([
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY(25px)', offset: 0.4 }),
        style({ transform: 'translateY(0)', offset: 1 })
      ])
    )
  ])
]);

export const smartSpringAnimation = trigger('smartSpring', [
   transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.95)' }),
      animate(
         '1000ms 100ms cubic-bezier(0.22, 1, 0.36, 1)', // simulant spring
         style({ opacity: 1, transform: 'scale(1)' })
      )
   ])
]);

@Component({
   selector: 'app-visibility-results',
   imports: [ButtonCloseComponent],
   templateUrl: './visibility-results.component.html',
   styleUrl: './visibility-results.component.scss',
   animations: [moveInTopWithFlipYAnimation, bounceOnceDownAnimation, smartSpringAnimation]
})
export class VisibilityResultsComponent {
   showSecondDiv = false;
   bounceTrigger = 'inactive';

   onFirstAnimationDone() {
      // Déclenche la seconde animation après la première
      setTimeout(() => {
         this.showSecondDiv = true;
         this.bounceTrigger = 'active';
      }, 100); // délai entre les 2 animations
   }
}
