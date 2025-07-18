import { Component, OnInit, OnDestroy, AfterViewInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PageComponentService } from "../../../service/page-component.service";

@Component({
   selector: "app-home-card",
   standalone: true,
   imports: [CommonModule],
   templateUrl: "./home-card.component.html",
   styleUrls: ["./home-card.component.scss"],
})
export class HomeCardComponent implements OnInit, OnDestroy, AfterViewInit {
   private pageComponentService = inject(PageComponentService);
   showWink = false;
   private animationTimeouts: number[] = [];
   private homePageLinkIds: Map<string, number> = new Map();

   constructor(private router: Router) {}

   ngOnInit(): void {
      // Initialisation de base
      this.pageComponentService.getHomePageLinkIds().subscribe({
         next: (data) => {
            this.homePageLinkIds = new Map(Object.entries(data));
         }
      });
   }

   ngAfterViewInit(): void {
      // Démarre l'animation après que la vue soit initialisée
      setTimeout(() => {
         this.startGhostAnimation();
      }, 100);
   }

   ngOnDestroy(): void {
      // Nettoie tous les timeouts quand on quitte la page
      this.animationTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      this.animationTimeouts = [];
   }

   startGhostAnimation(): void {
      // Nettoie les timeouts existants
      this.animationTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      this.animationTimeouts = [];

      // Animation en boucle : normal -> wink -> normal
      const animateWink = () => {
         // Commence par l'état normal
         this.showWink = false;

         // Après 3 secondes, fait un clin d'œil
         const winkTimeout = setTimeout(() => {
            this.showWink = true;

            // Le clin d'œil dure 1 seconde
            const normalTimeout = setTimeout(() => {
               this.showWink = false;

               // Recommence l'animation après 2 secondes
               const restartTimeout = setTimeout(animateWink, 2000);
               this.animationTimeouts.push(restartTimeout);
            }, 1000);
            this.animationTimeouts.push(normalTimeout);
         }, 3000);
         this.animationTimeouts.push(winkTimeout);
      };

      // Démarre l'animation
      animateWink();
   }

   navigateToTools(): void {
      this.router.navigate(["/tools"]);
   }

   navigateToHarassment(): void {
      this.router.navigate(["/problems/" + this.homePageLinkIds.get("3.3_cyberharcelement") || ""]);
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
}
