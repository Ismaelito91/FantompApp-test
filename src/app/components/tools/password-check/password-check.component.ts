import { Component, OnDestroy } from "@angular/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { FormsModule } from "@angular/forms";

const PASSWORD_STRENGTH_CONFIG = [
   // 18+ caractères, chiffres, minuscules, majuscules, symboles (niveau maximal)
   {
      minLength: 18,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "super",
      message: "Quasi incassable (plusieurs milliards d’années)",
   },
   // 12+ caractères, chiffres, minuscules, majuscules, symboles
   {
      minLength: 18,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "super",
      message: "Extrêmement robuste",
   },
   {
      minLength: 14,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "super",
      message: "Très robuste",
   },
   {
      minLength: 12,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "super",
      message: "Robuste (plusieurs millions d’années)",
   },
   // 12+ caractères, chiffres, lettres (majuscules ou minuscules)
   {
      minLength: 14,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: false,
      category: "super",
      message: "Très robuste (sans symboles)",
   },
   {
      minLength: 12,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: false,
      category: "super",
      message: "Robuste (sans symboles)",
   },
   // 12+ caractères, lettres majuscules+minuscules
   {
      minLength: 12,
      hasUpper: true,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "super",
      message: "Robuste (lettres seulement)",
   },
   // 10+ caractères, chiffres, lettres, symboles
   {
      minLength: 10,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "super",
      message: "Super (10+ caractères, tout type)",
   },
   // --- CORRECT (orange) ---
   // 10+ caractères, chiffres, lettres (sans symboles)
   {
      minLength: 10,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: false,
      category: "correct",
      message: "Correct (10+ caractères, sans symboles)",
   },
   // 10+ caractères, lettres majuscules+minuscules
   {
      minLength: 10,
      hasUpper: true,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "correct",
      message: "Correct (10+ caractères, lettres seulement)",
   },
   // 10+ caractères, lettres minuscules seules
   {
      minLength: 10,
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "correct",
      message: "Correct (10+ caractères, minuscules)",
   },
   // 9+ caractères, chiffres, lettres, symboles
   {
      minLength: 9,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "correct",
      message: "Correct (9+ caractères, tout type)",
   },
   // 9+ caractères, chiffres, lettres (sans symboles)
   {
      minLength: 9,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: false,
      category: "correct",
      message: "Correct (9+ caractères, sans symboles)",
   },
   // 9+ caractères, lettres majuscules+minuscules
   {
      minLength: 9,
      hasUpper: true,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "correct",
      message: "Correct (9+ caractères, lettres seulement)",
   },
   // 9+ caractères, lettres minuscules seules
   {
      minLength: 9,
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "correct",
      message: "Correct (9+ caractères, minuscules)",
   },
   // --- RAPIDE (rouge) ---
   // 8+ caractères, chiffres, lettres, symboles
   {
      minLength: 8,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      category: "rapide",
      message: "Rapide à craquer (8 caractères, tout type)",
   },
   // 8+ caractères, chiffres, lettres (sans symboles)
   {
      minLength: 8,
      hasUpper: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: false,
      category: "rapide",
      message: "Rapide à craquer (8 caractères, sans symboles)",
   },
   // 8+ caractères, lettres majuscules+minuscules
   {
      minLength: 8,
      hasUpper: true,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "rapide",
      message: "Rapide à craquer (8 caractères, lettres seulement)",
   },
   // 8+ caractères, lettres minuscules seules
   {
      minLength: 8,
      hasUpper: false,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      category: "rapide",
      message: "Rapide à craquer (8 caractères, minuscules)",
   },
   // --- IMMÉDIAT (violet) ---
   // 4-7 caractères, tout type
   {
      minLength: 4,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      category: "immédiat",
      message: "Immédiatement craqué (trop court)",
   },
   // 8+ chiffres seuls
   {
      minLength: 8,
      hasUpper: false,
      hasLower: false,
      hasNumber: true,
      hasSpecial: false,
      category: "immédiat",
      message: "Immédiatement craqué (chiffres seuls)",
   },
   // 5-7 chiffres seuls
   {
      minLength: 5,
      hasUpper: false,
      hasLower: false,
      hasNumber: true,
      hasSpecial: false,
      category: "immédiat",
      message: "Immédiatement craqué (chiffres seuls, trop court)",
   },
   // 4 chiffres seuls
   {
      minLength: 4,
      hasUpper: false,
      hasLower: false,
      hasNumber: true,
      hasSpecial: false,
      category: "immédiat",
      message: "Immédiatement craqué (chiffres seuls, très court)",
   },
   // Ajoute d’autres règles si besoin
];

function getPasswordCategory(password: string): {
   category: string;
   message: string;
} {
   const hasUpper = /[A-Z]/.test(password);
   const hasLower = /[a-z]/.test(password);
   const hasNumber = /[0-9]/.test(password);
   const hasSpecial = /[^a-zA-Z0-9]/.test(password); // Tous les caractères spéciaux
   const length = password.length;

   // On cherche la règle la plus forte qui correspond
   for (const rule of PASSWORD_STRENGTH_CONFIG) {
      if (
         length >= rule.minLength &&
         (!rule.hasUpper || hasUpper) &&
         (!rule.hasLower || hasLower) &&
         (!rule.hasNumber || hasNumber) &&
         (!rule.hasSpecial || hasSpecial)
      ) {
         return { category: rule.category, message: rule.message };
      }
   }
   // Par défaut, si rien ne correspond
   return { category: "immédiat", message: "Immédiatement craqué" };
}

@Component({
   selector: "app-password-check",
   imports: [ButtonBackComponent, FormsModule],
   templateUrl: "./password-check.component.html",
   styleUrl: "./password-check.component.scss",
})
export class PasswordCheckComponent implements OnDestroy {
   password: string = "";
   result: string = "";
   category: string = "";
   message: string = "";

   // Suivi de chaque critère pour affichage des icônes
   criteria = {
      length: false,
      upper: false,
      lower: false,
      number: false,
      special: false,
   };

   testPassword() {
      this.criteria.length = this.password.length >= 8;
      this.criteria.upper = /[A-Z]/.test(this.password);
      this.criteria.lower = /[a-z]/.test(this.password);
      this.criteria.number = /[0-9]/.test(this.password);
      this.criteria.special = /[^a-zA-Z0-9]/.test(this.password);

      if (!this.password) {
         this.result = "";
         this.category = "";
         this.message = "";
         // Réinitialise les critères
         this.criteria = {
            length: false,
            upper: false,
            lower: false,
            number: false,
            special: false,
         };
         return;
      }

      const evaluation = getPasswordCategory(this.password);
      this.category = evaluation.category;
      this.message = evaluation.message;
      this.result = `Catégorie : ${this.category}`;

      this.password = "";
   }

   ngOnDestroy() {
      this.password = "";
   }
}
