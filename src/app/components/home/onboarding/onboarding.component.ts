import {
   Component,
   inject,
   signal,
   OnInit,
   OnDestroy,
   ChangeDetectorRef,
   AfterViewInit,
   computed,
   ViewChild,
   ElementRef,
   effect,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import {
   trigger,
   state,
   style,
   transition,
   animate,
} from "@angular/animations";
import { OnboardingService } from "../../../service/onboarding.service";
import { Router } from "@angular/router";
import { ThemeService } from "../../../service/theme.service";
import { GhostAnimationService } from "../../../service/ghost-animation.service";
// Interface pour les éléments d'onboarding
interface OnboardingElement {
   id: string;
   type:
      | "ghost"
      | "welcome"
      | "explanation"
      | "skip"
      | "next-button"
      | "help"
      | "highlight"
      | "sad-ghost";
   step: number;
   visible: boolean;
}

@Component({
   selector: "app-onboarding",
   standalone: true,
   imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      TranslateModule,
   ],
   templateUrl: "./onboarding.component.html",
   styleUrl: "./onboarding.component.scss",
   animations: [
      // Animation pop-up : tout petit vers taille normale
      trigger("slideInUp", [
         state(
            "hidden",
            style({
               opacity: 0,
               transform: "scale(0)",
            })
         ),
         state(
            "visible",
            style({
               opacity: 1,
               transform: "scale(1)",
            })
         ),
         transition("hidden => visible", [
            // Pop-up avec rebond : de 0 à taille normale
            animate(
               "200ms ease-out",
               style({
                  opacity: 1,
                  transform: "scale(1)",
               })
            ),
         ]),
      ]),

      // Animation pop-up spéciale pour le fantôme
      trigger("ghostAppear", [
         state(
            "hidden",
            style({
               opacity: 0,
               transform: "scale(0)",
            })
         ),
         state(
            "visible",
            style({
               opacity: 1,
               transform: "scale(1)",
            })
         ),
         transition("hidden => visible", [
            // Pop-up dramatique pour le fantôme avec gros rebond
            animate(
               "200ms ease-out",
               style({
                  opacity: 1,
                  transform: "scale(1)",
               })
            ),
         ]),
      ]),
   ],
})
export class OnboardingComponent implements OnInit, OnDestroy, AfterViewInit {
   private onboardingService = inject(OnboardingService);
   private cdr = inject(ChangeDetectorRef);
   private router = inject(Router);
   private themeService = inject(ThemeService);
   private ghostAnimationService = inject(GhostAnimationService);

   @ViewChild("step1NextButton", { read: ElementRef })
   step1NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step1SkipButton", { read: ElementRef })
   step1SkipButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step2NextButton", { read: ElementRef })
   step2NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step2SkipButton", { read: ElementRef })
   step2SkipButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step3NextButton", { read: ElementRef })
   step3NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step3SkipButton", { read: ElementRef })
   step3SkipButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step4NextButton", { read: ElementRef })
   step4NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step4SkipButton", { read: ElementRef })
   step4SkipButtonRef!: ElementRef<HTMLButtonElement>;

   // Signal pour l'étape actuelle
   currentStep = signal<number>(1);

   // Propriété pour détecter le dark mode via le ThemeService
   isDarkMode = computed(() => {
      return this.themeService.isDark$();
   });

   // États d'animation pour l'étape 1
   animationStates = signal({
      welcome: "hidden",
      ghost: "hidden",
      explanation: "hidden",
      skip: "hidden",
      nextButton: "hidden",
   });

   constructor() {
      // Effet pour gérer le focus à chaque changement d'étape
      effect(() => {
         const step = this.currentStep();
         if (this.onboardingService.isOnboardingVisible()) {
            setTimeout(
               () => {
                  this.focusCurrentStepButton(step);
               },
               step > 1 ? 300 : 100
            );
         }
      });
   }

   ngOnInit() {
      this.startStep1Animations();
   }

   private focusCurrentStepButton(step: number) {
      document.activeElement instanceof HTMLElement &&
         document.activeElement.blur();

      const buttons: (HTMLElement | null)[] = [
         this.step1NextButtonRef?.nativeElement ||
            this.step1SkipButtonRef?.nativeElement,
         document.querySelector("footer .problem-button") as HTMLElement,
         document.querySelector("footer .tools-button") as HTMLElement,
         document.querySelector("footer .secure-button") as HTMLElement,
      ];

      buttons[step - 1]?.focus();
   }

   ngAfterViewInit() {
      // Plus besoin de détection manuelle, le ThemeService s'en charge
   }

   ngOnDestroy() {}

   /**
    * Démarre les animations de l'étape 1
    */
   private startStep1Animations(): void {
      // Étape 1: Welcome apparaît en premier
      const delay = 200;

      setTimeout(() => {
         this.animationStates.update((states) => ({
            ...states,
            welcome: "visible",
         }));
         this.cdr.detectChanges();
      }, delay);

      // Étape 2: Fantôme apparaît rapidement après
      setTimeout(() => {
         this.animationStates.update((states) => ({
            ...states,
            ghost: "visible",
         }));
         this.cdr.detectChanges();
      }, delay * 2);

      // Étape 3: Bulle explicative
      setTimeout(() => {
         this.animationStates.update((states) => ({
            ...states,
            explanation: "visible",
         }));
         this.cdr.detectChanges();
      }, delay * 3);

      // Étape 4: Boutons de contrôle
      setTimeout(() => {
         this.animationStates.update((states) => ({
            ...states,
            skip: "visible",
            nextButton: "visible",
         }));
         this.cdr.detectChanges();
         // Mettre le focus sur le bouton Next après l'animation
         setTimeout(() => {
            if (this.step1NextButtonRef?.nativeElement) {
               this.step1NextButtonRef.nativeElement.focus();
            }
         }, 100);
      }, delay * 4);
   }

   /**
    * Termine l'onboarding et passe à l'étape suivante
    */
   completeOnboarding(): void {
      const step = this.currentStep();

      if (step === 1) {
         this.currentStep.set(2);
         this.onboardingService.activateProblemIcon();
         this.router.navigate(["/problems"]);
      } else if (step === 2) {
         this.currentStep.set(3);
         this.onboardingService.deactivateProblemIcon();
         this.onboardingService.activateToolsIcon();
         this.router.navigate(["/tools"]);
      } else if (step === 3) {
         this.currentStep.set(4);
         this.onboardingService.deactivateToolsIcon();
         this.onboardingService.activateSecureMyselfIcon();
         this.router.navigate(["/secure-myself"]);
      } else if (step === 4) {
         this.onboardingService.completeOnboarding();
         this.onboardingService.deactivateSecureMyselfIcon();
         this.router.navigate(["/home"]);
         this.ghostAnimationService.triggerGhostAnimation();
      }
   }

   /**
    * Ferme l'onboarding sans le marquer comme terminé
    */
   closeOnboarding(): void {
      // Retirer le focus avant de fermer l'onboarding
      if (document.activeElement instanceof HTMLElement) {
         document.activeElement.blur();
      }
      // Désactiver toutes les icônes actives
      this.onboardingService.deactivateProblemIcon();
      this.onboardingService.deactivateToolsIcon();
      this.onboardingService.deactivateSecureMyselfIcon();
      this.onboardingService.completeOnboarding();
      this.onboardingService.hideOnboarding();
      this.router.navigate(["/home"]);
   }
}
