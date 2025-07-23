import { Component, OnDestroy } from "@angular/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { FormsModule } from "@angular/forms";

@Component({
   selector: "app-tools-password",
   templateUrl: "./tools-password.component.html",
   styleUrl: "./tools-password.component.scss",
   standalone: true,
   imports: [ButtonBackComponent, FormsModule],
})
export class ToolsPasswordComponent implements OnDestroy {
   password: string = "";
   result: string = "";
   crackTime: string = "";

   // Suivi de chaque critère pour affichage des icônes
   criteria = {
      length: false,
      upper: false,
      lower: false,
      special: false,
   };

   testPassword() {
      this.criteria.length = this.password.length >= 12;
      this.criteria.upper = /[A-Z]/.test(this.password);
      this.criteria.lower = /[a-z]/.test(this.password);
      this.criteria.special = /[\*\@\;\!]/.test(this.password);

      if (!this.password) {
         this.result = "";
         this.crackTime = "";
         // Réinitialise les critères
         this.criteria = {
            length: false,
            upper: false,
            lower: false,
            special: false,
         };
         return;
      }

      if (
         this.criteria.length &&
         this.criteria.upper &&
         this.criteria.lower &&
         this.criteria.special
      ) {
         this.result = "Robuste";
         this.crackTime = "Plusieurs millions d’années 🚀";
      } else if (
         this.password.length >= 8 &&
         (this.criteria.upper || this.criteria.special)
      ) {
         this.result = "Moyen";
         this.crackTime = "Quelques heures à quelques jours";
      } else {
         this.result = "Faible";
         this.crackTime = "Moins d’une seconde 😱";
      }

      this.password = "";
   }

   ngOnDestroy() {
      this.password = "";
   }
}
