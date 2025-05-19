import { Component, OnInit, Renderer2, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import {
   trigger,
   state,
   style,
   animate,
   transition,
} from "@angular/animations";

@Component({
   selector: "app-splash-screen",
   standalone: true,
   imports: [CommonModule],
   templateUrl: "./splash-screen.component.html",
   styleUrls: ["./splash-screen.component.scss"],
   animations: [
      trigger("fadeOut", [
         state("visible", style({ opacity: 1 })),
         state("hidden", style({ opacity: 0 })),
         transition("visible => hidden", [animate("0.5s ease-out")]),
      ]),
   ],
})
export class SplashScreenComponent implements OnInit {
   fadeState: "visible" | "hidden" = "visible";

   constructor(
      private router: Router,
      private renderer: Renderer2,
      @Inject(DOCUMENT) private document: Document
   ) {}

   ngOnInit(): void {
      // Assurer que le viewport est correctement configuré
      this.ensureViewportMeta();

      // Afficher l'écran de démarrage pendant 2.5 secondes puis naviguer vers l'accueil
      setTimeout(() => {
         this.fadeState = "hidden";
         setTimeout(() => {
            this.router.navigate(["/home"]);
         }, 500); // Attendre que l'animation de fade-out se termine
      }, 2500);
   }

   private ensureViewportMeta(): void {
      // Vérifier si la balise meta viewport existe
      let viewportMeta = this.document.querySelector('meta[name="viewport"]');

      // Si elle n'existe pas, on la crée
      if (!viewportMeta) {
         viewportMeta = this.renderer.createElement("meta");
         this.renderer.setAttribute(viewportMeta, "name", "viewport");
         this.renderer.appendChild(this.document.head, viewportMeta);
      }

      // Définir les attributs du viewport pour une expérience mobile optimale
      this.renderer.setAttribute(
         viewportMeta,
         "content",
         "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
      );
   }
}
