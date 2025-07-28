import { Component, OnInit, computed, inject, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { GhostAnimationService } from "../../../service/ghost-animation.service";
import { PreloadService } from "../../../service/preload.service";

@Component({
   selector: "app-home-card",
   standalone: true,
   imports: [CommonModule, RouterModule, MatIconModule],
   templateUrl: "./home-card.component.html",
   styleUrls: ["./home-card.component.scss"],
})
export class HomeCardComponent implements OnInit {
   private ghostAnimationService = inject(GhostAnimationService);
   private preloadService = inject(PreloadService);
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

   ngOnInit(): void {}

   navigateToTools(): void {
      this.router.navigate(["/tools"]);
   }

   navigateToHarassment(): void {
      this.router.navigate([
         "/problems/" + this.homePageLinkIds.get("3.3_cyberharcelement") || "",
      ]);
   }

   onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToTools();
      }
   }

   onKeyDownHarassment(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToHarassment();
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
}
