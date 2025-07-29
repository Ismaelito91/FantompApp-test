import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeVariant } from '../../../../model/type/badge-variant.type';
import { BadgeComponent } from "../../../design-system/badge/badge.component";
import { ButtonCloseComponent } from "../../../design-system/button-close/button-close.component";
import { TranslatePipe } from '@ngx-translate/core';

export const moveInTopWithFlipYAnimation = trigger('moveInTopWithFlipY', [
   transition(':enter', [
      animate(
         '3000ms 200ms cubic-bezier(0.22, 1, 0.36, 1)', // ralentir + effet spring
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

type Results = {
   pseudo: string[],
   bio: string[]
}

type Badge = {
   title: string,
   variant: BadgeVariant,
}
@Component({
   selector: 'app-visibility-results',
   imports: [ButtonCloseComponent, BadgeComponent, TranslatePipe],
   templateUrl: './visibility-results.component.html',
   styleUrl: './visibility-results.component.scss',
   animations: [moveInTopWithFlipYAnimation, bounceOnceDownAnimation, smartSpringAnimation]
})
export class VisibilityResultsComponent implements OnInit {
   private readonly router = inject(Router);
   showSecondDiv = false;
   bounceTrigger = 'inactive';
   results!: Results;
   pseudoBadge!: Badge;
   bioBadge!: Badge;
   summary!: { title: string, content: string };

   ngOnInit(): void {
      const state = history.state as { results: Results };
      this.results = state.results;
      if (this.results.pseudo.length === 0) {
         this.pseudoBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.INVISIBLE', variant: 'success' };
      } else if (this.results.pseudo.length <= 2) {
         this.pseudoBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.DISCREET', variant: 'info' };
      } else {
         this.pseudoBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.PUBLIC', variant: 'danger-light' };
      }

      if (this.results.bio.length === 0) {
         this.bioBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.INVISIBLE', variant: 'success' };
      } else if (this.results.bio.length <= 2) {
         this.bioBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.DISCREET', variant: 'info' };
      } else {
         this.bioBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.PUBLIC', variant: 'danger-light' };
      }

      if (this.pseudoBadge.variant === 'danger-light' || this.bioBadge.variant === 'danger-light') {
         this.summary = {
            title: 'TOOLS.VISIBILITY_CHECK.RESULTS.SUMMARY.BAD.TITLE',
            content: 'TOOLS.VISIBILITY_CHECK.RESULTS.SUMMARY.BAD.CONTENT'
         };
      } else if (this.pseudoBadge.variant === 'success' && this.bioBadge.variant === 'success') {
         this.summary = {
            title: 'TOOLS.VISIBILITY_CHECK.RESULTS.SUMMARY.GOOD.TITLE',
            content: 'TOOLS.VISIBILITY_CHECK.RESULTS.SUMMARY.GOOD.CONTENT'
         };
      } else {
         this.summary = {
            title: 'TOOLS.VISIBILITY_CHECK.RESULTS.SUMMARY.OK.TITLE',
            content: 'TOOLS.VISIBILITY_CHECK.RESULTS.SUMMARY.OK.CONTENT'
         }
      }
   }
   onFirstAnimationDone() {
      // Déclenche la seconde animation après la première
      setTimeout(() => {
         this.showSecondDiv = true;
         this.bounceTrigger = 'active';
      }, 100); // délai entre les 2 animations
   }
}
