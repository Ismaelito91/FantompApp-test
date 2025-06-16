import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { IconGeneratorService } from "../../../service/icon-generator.service";

@Component({
   selector: "app-app-icon-selector",
   imports: [MatIconModule, MatButtonModule, RouterModule],
   templateUrl: "./app-icon-selector.component.html",
   styleUrl: "./app-icon-selector.component.scss",
})
export class AppIconSelectorComponent implements OnInit {
   private currentIcon: string = "cnil";

   constructor(private iconGeneratorService: IconGeneratorService) {}

   ngOnInit(): void {
      // Charger l'icône sauvegardée depuis le localStorage
      const savedIcon = localStorage.getItem("app-icon-preference");
      if (savedIcon) {
         this.currentIcon = savedIcon;
      }
   }

   /**
    * Vérifie si l'icône spécifiée est actuellement sélectionnée
    */
   isIconSelected(icon: string): boolean {
      return this.currentIcon === icon;
   }

   /**
    * Définit l'icône de l'application
    */
   setIcon(icon: string): void {
      this.currentIcon = icon;

      // Mettre à jour l'icône via le service
      this.iconGeneratorService.updateIcon(icon).catch((error) => {
         console.error("Erreur lors du changement d'icône:", error);
      });
   }
}
