import {
   Component,
   inject,
   signal,
   OnInit,
   OnDestroy,
   ChangeDetectorRef,
   computed,
   ViewChild,
   ElementRef,
   effect,
   HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { A11yModule } from "@angular/cdk/a11y";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import {
   trigger,
   state,
   style,
   transition,
   animate,
} from "@angular/animations";
import { OnboardingService } from "../../../service/onboarding.service";
import { NavigationEnd, NavigationStart, Router } from "@angular/router";
import { ThemeService } from "../../../service/theme.service";
import { GhostAnimationService } from "../../../service/ghost-animation.service";
import { Subscription } from "rxjs";

const HTML_TAG_REGEX = /<[^>]*>/g;
const EMOJI_REGEX =
   /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu;
const MULTISPACE_REGEX = /\s+/g;

@Component({
   selector: "app-onboarding",
   standalone: true,
   imports: [
      CommonModule,
      A11yModule,
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
export class OnboardingComponent implements OnInit, OnDestroy {
   private onboardingService = inject(OnboardingService);
   private cdr = inject(ChangeDetectorRef);
   private router = inject(Router);
   private themeService = inject(ThemeService);
   private ghostAnimationService = inject(GhostAnimationService);
   private translate = inject(TranslateService);

   @ViewChild("step1NextButton", { read: ElementRef })
   step1NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step2NextButton", { read: ElementRef })
   step2NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step3NextButton", { read: ElementRef })
   step3NextButtonRef!: ElementRef<HTMLButtonElement>;
   @ViewChild("step4NextButton", { read: ElementRef })
   step4NextButtonRef!: ElementRef<HTMLButtonElement>;

   // Signal pour l'étape actuelle
   currentStep = signal<number>(1);
   private routerEventsSub?: Subscription;
   private focusTimeoutId?: ReturnType<typeof setTimeout>;

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
      effect(() => {
         if (this.onboardingService.isOnboardingVisible())
            this.scheduleStepFocus(this.currentStep(), "step-change");
      });
   }

   ngOnInit() {
      this.startStep1Animations();
      this.routerEventsSub = this.router.events.subscribe((event) => {
         if (event instanceof NavigationStart) {
            if (this.onboardingService.isOnboardingVisible()) this.focusOverlay();
            return;
         }
         if (!(event instanceof NavigationEnd)) return;
         if (!this.onboardingService.isOnboardingVisible()) return;
         this.scheduleStepFocus(this.currentStep(), "route");
      });
   }

   private focusCurrentStepContent(step: number, attempt = 0): void {
      const target =
         (document.querySelector(
            `[data-step-announcement="${step}"]`
         ) as HTMLElement | null) ?? this.getStepButton(step);

      if (!target) {
         if (attempt < 12) {
            setTimeout(() => this.focusCurrentStepContent(step, attempt + 1), 100);
         }
         return;
      }

      if (document.activeElement === target) return;
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
   }

   ngOnDestroy() {
      this.routerEventsSub?.unsubscribe();
      if (this.focusTimeoutId) clearTimeout(this.focusTimeoutId);
   }

   getCurrentAnnouncementId(): string {
      return `onboarding-step-${this.currentStep()}-announcement`;
   }

   getCurrentDialogLabel(): string {
      const labels = [
         "ONBOARDING.WELCOME_TO",
         "ONBOARDING.STEP_TWO.TITLE",
         "ONBOARDING.STEP_THREE.TITLE",
         "ONBOARDING.STEP_FOUR.TITLE",
      ];
      return this.getCleanTranslation(labels[this.currentStep() - 1] ?? "");
   }

   getStepAnnouncementText(step: number): string {
      const data = [
         ["ONBOARDING.WELCOME_TO", "ONBOARDING.GHOST_MODE_EXPLANATION"],
         ["ONBOARDING.STEP_TWO.TITLE", "ONBOARDING.STEP_TWO.DESCRIPTION"],
         ["ONBOARDING.STEP_THREE.TITLE", "ONBOARDING.STEP_THREE.DESCRIPTION"],
         ["ONBOARDING.STEP_FOUR.TITLE", "ONBOARDING.STEP_FOUR.DESCRIPTION"],
      ][step - 1];
      if (!data) return "";
      const [title, desc] = data;
      const appName = step === 1 ? " FantomApp." : ".";
      return `${this.getCleanTranslation(title)}${appName} ${this.getCleanTranslation(desc)}`;
   }

   @HostListener("document:focusin", ["$event"])
   onDocumentFocusIn(event: FocusEvent): void {
      const overlay = document.querySelector(".onboarding-overlay");
      const target = event.target as Node | null;
      if (!overlay || !target) return;
      if (overlay.contains(target)) return;
      if (!this.onboardingService.isOnboardingVisible()) return;

      this.scheduleStepFocus(this.currentStep(), "trap");
   }

   @HostListener("keydown", ["$event"])
   onKeyDown(event: KeyboardEvent): void {
      if (event.key !== "Escape") return;
      if (!this.onboardingService.isOnboardingVisible()) return;
      event.preventDefault();
      this.closeOnboarding();
   }

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

   private getCleanTranslation(key: string): string {
      return this.cleanForScreenReader(this.translate.instant(key));
   }

   private scheduleStepFocus(
      step: number,
      source: "step-change" | "route" | "trap"
   ): void {
      const baseDelay = source === "trap" ? 0 : source === "route" ? 80 : 120;
      const delay = baseDelay + (step >= 3 ? 80 : 0);

      if (this.focusTimeoutId) clearTimeout(this.focusTimeoutId);
      this.focusTimeoutId = setTimeout(() => {
         this.focusCurrentStepContent(step);
      }, delay);
   }

   private focusOverlay(): void {
      const overlay = document.querySelector(".onboarding-overlay") as
         | HTMLElement
         | null;
      if (!overlay) return;
      overlay.setAttribute("tabindex", "-1");
      overlay.focus({ preventScroll: true });
   }

   private getStepButton(step: number): HTMLButtonElement | null {
      return [
         this.step1NextButtonRef?.nativeElement || null,
         this.step2NextButtonRef?.nativeElement || null,
         this.step3NextButtonRef?.nativeElement || null,
         this.step4NextButtonRef?.nativeElement || null,
      ][step - 1];
   }

   private cleanForScreenReader(value: string): string {
      return (value ?? "")
         .replace(HTML_TAG_REGEX, " ")
         .replace(EMOJI_REGEX, "")
         .replace(MULTISPACE_REGEX, " ")
         .trim();
   }
}
