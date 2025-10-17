import {
   Component,
   inject,
   signal,
   OnInit,
   OnDestroy,
   ChangeDetectorRef,
   AfterViewInit,
   computed,
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
               "500ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
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
               "600ms cubic-bezier(0.175, 0.885, 0.32, 1.4)",
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
   ngOnInit() {
      console.log("🚀 Onboarding démarré, étape initiale:", this.currentStep());
      this.startStep1Animations();
   }

   ngAfterViewInit() {
      // Plus besoin de détection manuelle, le ThemeService s'en charge
      console.log("✅ Vue initialisée, thème détecté:", this.isDarkMode());
   }

   ngOnDestroy() {
      console.log("🔚 Onboarding terminé");
   }

   /**
    * Démarre les animations de l'étape 1
    */
   private startStep1Animations(): void {
      console.log("🎬 Démarrage des animations étape 1");

      // Étape 1: Welcome apparaît en premier
      setTimeout(() => {
         console.log("✨ Affichage du welcome");
         this.animationStates.update((states) => ({
            ...states,
            welcome: "visible",
         }));
         this.cdr.detectChanges();
      }, 300);

      // Étape 2: Fantôme apparaît après 1500ms
      setTimeout(() => {
         console.log("👻 Affichage du fantôme");
         this.animationStates.update((states) => ({
            ...states,
            ghost: "visible",
         }));
         this.cdr.detectChanges();
      }, 1500);

      // Étape 3: Bulle explicative après 2700ms
      setTimeout(() => {
         console.log("💭 Affichage de l'explication");
         this.animationStates.update((states) => ({
            ...states,
            explanation: "visible",
         }));
         this.cdr.detectChanges();
      }, 2700);

      // Étape 4: Boutons de contrôle après 3900ms
      setTimeout(() => {
         console.log("🎛️ Affichage des contrôles");
         this.animationStates.update((states) => ({
            ...states,
            skip: "visible",
            nextButton: "visible",
         }));
         this.cdr.detectChanges();
      }, 3900);
   }

   /**
    * Termine l'onboarding et passe à l'étape suivante
    */
   completeOnboarding(): void {
      console.log(
         "➡️ Complete Onboarding appelé, étape actuelle:",
         this.currentStep()
      );

      if (this.currentStep() === 1) {
         // Passer à l'étape 2, activer l'icône problème
         this.currentStep.set(2);
         this.onboardingService.activateProblemIcon();
         console.log("🔄 Passage à l'étape 2");
      } else if (this.currentStep() === 2) {
         // Passer à l'étape 3, activer l'icône outils
         this.currentStep.set(3);
         this.onboardingService.deactivateProblemIcon();
         this.onboardingService.activateToolsIcon();
         console.log("🔄 Passage à l'étape 3");
      } else if (this.currentStep() === 3) {
         // Passer à l'étape 4, activer l'icône "Me sécuriser" et naviguer vers la page des problèmes
         this.currentStep.set(4);
         this.onboardingService.deactivateToolsIcon();
         this.onboardingService.activateSecureMyselfIcon();
         this.router.navigate(["/problems"]);
         console.log("🔄 Passage à l'étape 4 sur la page des problèmes");
         console.log("📍 Étape actuelle après navigation:", this.currentStep());
         console.log(
            "👁️ Onboarding visible:",
            this.onboardingService.isOnboardingVisible()
         );
      } else if (this.currentStep() === 4) {
         // Fermer l'onboarding et rediriger vers la page d'accueil
         this.onboardingService.completeOnboarding();
         this.onboardingService.deactivateSecureMyselfIcon();
         this.router.navigate(["/home"]);
         console.log("✅ Onboarding terminé, redirection vers /home");
         // Déclencher l'animation du fantôme après un délai pour laisser la page se charger
         this.ghostAnimationService.triggerGhostAnimation();
      }
   }

   /**
    * Ferme l'onboarding sans le marquer comme terminé
    */
   closeOnboarding(): void {
      this.onboardingService.completeOnboarding();
      this.onboardingService.hideOnboarding();
      this.router.navigate(["/home"]);
   }
}
