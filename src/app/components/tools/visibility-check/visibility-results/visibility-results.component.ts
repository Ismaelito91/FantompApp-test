import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BadgeVariant } from '../../../../model/type/badge-variant.type';
import { BadgeComponent } from "../../../design-system/badge/badge.component";
import { ButtonCloseComponent } from "../../../design-system/button-close/button-close.component";

export const flipDropFromTopOfPage = trigger('flipDropFromTopOfPage', [
   transition(':enter', [
      style({
         position: 'absolute',
         top: '-100vh',
         transform: 'rotateY(-270deg)',
         width: 'calc(100% - 32px)',
         transformOrigin: 'top',
      }),
      animate(
         '2000ms 200ms cubic-bezier(0.22, 1, 0.36, 1)',
         style({
            top: '88px',
            left: '16px',
            transform: 'rotateY(0deg)',
         })
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
   animations: [flipDropFromTopOfPage, bounceOnceDownAnimation, smartSpringAnimation]
})
export class VisibilityResultsComponent implements OnInit {
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
      } else if (this.results.pseudo.length <= 2 && !this.results.pseudo.find((v) => v === "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_TITLE")) {
         this.pseudoBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.DISCREET', variant: 'info' };
      } else {
         this.pseudoBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.PUBLIC', variant: 'danger-light' };
      }

      if (this.results.bio.length === 0) {
         this.bioBadge = { title: 'TOOLS.VISIBILITY_CHECK.RESULTS.STATE.INVISIBLE', variant: 'success' };
      } else if (this.results.bio.length <= 2 && !this.results.bio.find((v) => v === "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_1_TITLE")) {
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
