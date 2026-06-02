import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { GhostAnimationService } from "../../../service/ghost-animation.service";
import { PreloadService } from "../../../service/preload.service";
import { ZoomLayoutService } from "../../../service/zoom-layout.service";

@Component({
   selector: "app-home-card",
   standalone: true,
   imports: [CommonModule, RouterModule, MatIconModule, TranslatePipe],
   templateUrl: "./home-card.component.html",
   styleUrls: ["./home-card.component.scss"],
})
export class HomeCardComponent {
   private ghostAnimationService = inject(GhostAnimationService);
   private preloadService = inject(PreloadService);
   private readonly zoomLayout = inject(ZoomLayoutService);
   private homePageLinkIds: Map<string, number> = new Map();
   shouldPlayGhostAnimation = computed(() =>
      this.ghostAnimationService.shouldPlayGhostAnimation()
   );

   constructor(private router: Router) {
      effect(() => {
         if (this.preloadService.isPreloaded()) {
            const preloadedData = this.preloadService.preloadedData();
            if (
               preloadedData &&
               Object.keys(preloadedData.homePageLinkIds).length > 0
            ) {
               this.homePageLinkIds = new Map(
                  Object.entries(preloadedData.homePageLinkIds)
               );
            }
         }
      });
   }

   navigateTo(url: string): void {
      this.router.navigate([url]);
   }

   navigateToTools(): void {
      this.router.navigate(["/tools"]);
   }

   navigateToProblems(): void {
      this.router.navigate(["/problems"]);
   }

   navigateToHarassment(): void {
      this.router.navigate([
         "/problems/" + this.homePageLinkIds.get("3.3_cyberharcelement") || "",
      ]);
   }

   navigateToDelete(): void {
      this.router.navigate(["/delete-content"]);
   }

   onKeyDownAnonym(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateTo("tools/blur-image");
      }
   }
   onKeyDownPasswordCheck(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateTo("tools/password-check");
      }
   }
   navigateToBlurImage(): void {
      this.navigateTo("tools/blur-image");
   }
   navigateToPasswordCheck(): void {
      this.navigateTo("tools/password-check");
   }

   onKeyDownHarassment(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToHarassment();
      }
   }

   onKeyDownDelete(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToDelete();
      }
   }

   /**
    * Désactive l'animation du fantôme quand elle se termine
    */
   onGhostAnimationEnd(): void {
      // on met un timeout le temps de laisser la deuxième animation s'effectuer
      setTimeout(() => {
         this.ghostAnimationService.stopGhostAnimation();
      }, 1500);
   }

   shouldUseZoomLayout(): boolean {
      return this.zoomLayout.isZoomAtLeast(1.7);
   }

   /** Évite de cacher le fantôme en affichage normal; le masque uniquement en zoom fort. */
   shouldHideGhostForZoom(): boolean {
      return this.shouldUseZoomLayout();
   }
}
