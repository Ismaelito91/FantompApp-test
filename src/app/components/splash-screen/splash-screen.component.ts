import {
   Component,
   OnInit,
   Renderer2,
   Inject,
   ViewChild,
   ElementRef,
   inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { gsap } from "gsap";
import { OnboardingService } from "../../service/onboarding.service";

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

   constructor(
      private router: Router,
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document
   ) {}

   ngOnInit(): void {
      this.ensureViewportMeta();
      setTimeout(() => {
         const el = this.splashContainer.nativeElement;
         gsap.to(el, {
            opacity: 0,
            duration: 1.7,
            ease: "power2.inOut",
            onComplete: () => {
               // Vérifier si c'est la première visite et si l'onboarding doit être affiché
               if (!this.onboardingService.hasCompletedOnboarding()) {
                  // Rediriger vers l'onboarding
                  this.router.navigate(["/onboarding"]);
               } else {
                  // Rediriger vers la page d'accueil normale
                  this.router.navigate(["/home"]);
               }
            },
         });
      }, 1700);
   }

   private ensureViewportMeta(): void {
      let viewportMeta = this.document.querySelector('meta[name="viewport"]');
      if (!viewportMeta) {
         viewportMeta = this.renderer.createElement("meta");
         this.renderer.setAttribute(viewportMeta, "name", "viewport");
         this.renderer.appendChild(this.document.head, viewportMeta);
      }
      this.renderer.setAttribute(
         viewportMeta,
         "content",
         "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
      );
   }
}
