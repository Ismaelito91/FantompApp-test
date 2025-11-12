import {
   Component,
   OnInit,
   Renderer2,
   Inject,
   ViewChild,
   ElementRef,
   inject,
   computed,
   effect,
   signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { gsap } from "gsap";
import { OnboardingService } from "../../service/onboarding.service";
import { GhostAnimationService } from "../../service/ghost-animation.service";
import { PreloadService } from "../../service/preload.service";
import { UtilsService } from "../../service/utils.service";
// import { toObservable } from "@angular/core/rxjs-interop";
// import { combineLatest, timer } from "rxjs";
// import { filter, take, map } from "rxjs/operators";

@Component({
   selector: "app-splash-screen",
   standalone: true,
   imports: [CommonModule],
   templateUrl: "./splash-screen.component.html",
   styleUrls: ["./splash-screen.component.scss"],
})
export class SplashScreenComponent implements OnInit {
   @ViewChild("splashContainer", { static: true }) splashContainer!: ElementRef;

   private onboardingService = inject(OnboardingService);
   private ghostAnimationService = inject(GhostAnimationService);
   private preloadService = inject(PreloadService);
   private utilsService = inject(UtilsService);

   private minimumTimeElapsed = signal(false);

   private canStartExitAnimation = computed(() => 
      this.minimumTimeElapsed() && this.preloadService.isPreloaded()
   );

   constructor(
      private router: Router,
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document
   ) {
      // Effect qui réagit automatiquement aux changements
      effect(() => {
         if (this.canStartExitAnimation()) {
            this.startExitAnimation();
         }
      });
   }

   ngOnInit(): void {
      // Déclencher le délai minimum
      setTimeout(() => {
         this.minimumTimeElapsed.set(true);
      }, 1700);
   }

   private startExitAnimation(): void {
      const el = this.splashContainer.nativeElement;
      gsap.to(el, {
         opacity: 0,
         duration: 1.7,
         ease: "power2.inOut",
         onComplete: () => {
            // Vérifier si c'est la première visite et si l'onboarding doit être affiché
            if (!this.onboardingService.hasCompletedOnboarding() && !this.utilsService.isDesktop()) {
               // Lancer l'onboarding directement
               this.onboardingService.showOnboarding();
               this.router.navigate(["/home"]);
            } else {
               // Rediriger vers la page d'accueil normale
               this.router.navigate(["/home"]);
               // Déclencher l'animation du fantôme après un délai pour laisser la page se charger
               this.ghostAnimationService.triggerGhostAnimation();
            }
         },
      });
   }

}
