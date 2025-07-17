import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
   selector: "app-home-card",
   standalone: true,
   imports: [CommonModule],
   templateUrl: "./home-card.component.html",
   styleUrls: ["./home-card.component.scss"],
})
export class HomeCardComponent implements OnInit, OnDestroy, AfterViewInit {
   showWink = false;
   private animationTimeouts: number[] = [];

   constructor(private router: Router) {}

   ngOnInit(): void {
      // Initialisation de base
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

   navigateToProblems(): void {
      this.router.navigate(["/problems"]);
   }

   onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToTools();
      }
   }

   onKeyDownProblems(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToProblems();
      }
   }
}
