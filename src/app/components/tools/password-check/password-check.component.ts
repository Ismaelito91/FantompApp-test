import { Component, OnDestroy } from "@angular/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { FormsModule } from "@angular/forms";

// Fonctions utilitaires pour tester les types de caractères
function hasAllTypes(password: string): boolean {
   return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[a-zA-Z0-9]/.test(password)
   );
}
function hasUpperLowerNumber(password: string): boolean {
   return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}
function hasUpperLower(password: string): boolean {
   return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      !/[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}
function hasOnlyLower(password: string): boolean {
   return (
      !/[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      !/[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}
function hasOnlyUpper(password: string): boolean {
   return (
      /[A-Z]/.test(password) &&
      !/[a-z]/.test(password) &&
      !/[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}
function hasOnlyNumbers(password: string): boolean {
   return (
      !/[A-Z]/.test(password) &&
      !/[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}
function hasUpperNumber(password: string): boolean {
   return (
      /[A-Z]/.test(password) &&
      !/[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}
function hasLowerNumber(password: string): boolean {
   return (
      !/[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      !/[^a-zA-Z0-9]/.test(password)
   );
}

// Configuration simplifiée basée sur votre grille
const PASSWORD_STRENGTH_RULES = [
   // 4 caractères
   {
      test: (pwd: string) => pwd.length === 4 && hasAllTypes(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, tout type)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasUpperLowerNumber(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, maj/min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasUpperLower(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, maj/min)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasLowerNumber(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasUpperNumber(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, maj/num)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasOnlyLower(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, min)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasOnlyUpper(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, maj)",
   },
   {
      test: (pwd: string) => pwd.length === 4 && hasOnlyNumbers(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (4, num)",
   },
   {
      test: (pwd: string) => pwd.length === 4,
      category: "immédiat",
      message: "Immédiatement craqué (4, autre)",
   },

   // 5 caractères
   {
      test: (pwd: string) => pwd.length === 5 && hasAllTypes(pwd),
      category: "rapide",
      message: "Rapide à craquer (5, tout type)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasUpperLowerNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (5, maj/min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasUpperLower(pwd),
      category: "rapide",
      message: "Rapide à craquer (5, maj/min)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasLowerNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (5, min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasUpperNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (5, maj/num)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasOnlyLower(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (5, min)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasOnlyUpper(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (5, maj)",
   },
   {
      test: (pwd: string) => pwd.length === 5 && hasOnlyNumbers(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (5, num)",
   },
   {
      test: (pwd: string) => pwd.length === 5,
      category: "immédiat",
      message: "Immédiatement craqué (5, autre)",
   },

   // 6 caractères
   {
      test: (pwd: string) => pwd.length === 6 && hasAllTypes(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, tout type)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasUpperLowerNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, maj/min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasUpperLower(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, maj/min)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasLowerNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasUpperNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, maj/num)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasOnlyLower(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, min)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasOnlyUpper(pwd),
      category: "rapide",
      message: "Rapide à craquer (6, maj)",
   },
   {
      test: (pwd: string) => pwd.length === 6 && hasOnlyNumbers(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (6, num)",
   },
   {
      test: (pwd: string) => pwd.length === 6,
      category: "immédiat",
      message: "Immédiatement craqué (6, autre)",
   },

   // 7 caractères
   {
      test: (pwd: string) => pwd.length === 7 && hasAllTypes(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, tout type)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasUpperLowerNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, maj/min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasUpperLower(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, maj/min)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasLowerNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, min/num)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasUpperNumber(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, maj/num)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasOnlyLower(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, min)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasOnlyUpper(pwd),
      category: "rapide",
      message: "Rapide à craquer (7, maj)",
   },
   {
      test: (pwd: string) => pwd.length === 7 && hasOnlyNumbers(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (7, num)",
   },
   {
      test: (pwd: string) => pwd.length === 7,
      category: "immédiat",
      message: "Immédiatement craqué (7, autre)",
   },

   // 8 caractères
   {
      test: (pwd: string) => pwd.length === 8 && hasAllTypes(pwd),
      category: "correct",
      message: "Correct (8 jours)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasUpperLowerNumber(pwd),
      category: "correct",
      message: "Correct (2 mois)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasUpperLower(pwd),
      category: "correct",
      message: "Correct (15 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasLowerNumber(pwd),
      category: "correct",
      message: "Correct (62 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasUpperNumber(pwd),
      category: "correct",
      message: "Correct (62 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasOnlyLower(pwd),
      category: "correct",
      message: "Correct (3 semaines)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasOnlyUpper(pwd),
      category: "correct",
      message: "Correct (3 semaines)",
   },
   {
      test: (pwd: string) => pwd.length === 8 && hasOnlyNumbers(pwd),
      category: "immédiat",
      message: "Immédiatement craqué (8, num)",
   },
   {
      test: (pwd: string) => pwd.length === 8,
      category: "immédiat",
      message: "Immédiatement craqué (8, autre)",
   },

   // 9 caractères
   {
      test: (pwd: string) => pwd.length === 9 && hasAllTypes(pwd),
      category: "correct",
      message: "Correct (3 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasUpperLowerNumber(pwd),
      category: "correct",
      message: "Correct (11 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasUpperLower(pwd),
      category: "correct",
      message: "Correct (790 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasLowerNumber(pwd),
      category: "correct",
      message: "Correct (3k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasUpperNumber(pwd),
      category: "correct",
      message: "Correct (3k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasOnlyLower(pwd),
      category: "correct",
      message: "Correct (2 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasOnlyUpper(pwd),
      category: "correct",
      message: "Correct (2 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 9 && hasOnlyNumbers(pwd),
      category: "rapide",
      message: "Rapide à craquer (2 heures)",
   },
   {
      test: (pwd: string) => pwd.length === 9,
      category: "immédiat",
      message: "Immédiatement craqué (9, autre)",
   },

   // 10 caractères
   {
      test: (pwd: string) => pwd.length === 10 && hasAllTypes(pwd),
      category: "correct",
      message: "Correct (226 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasUpperLowerNumber(pwd),
      category: "correct",
      message: "Correct (600 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasUpperLower(pwd),
      category: "super",
      message: "Super (41k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasLowerNumber(pwd),
      category: "super",
      message: "Super (233k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasUpperNumber(pwd),
      category: "super",
      message: "Super (233k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasOnlyLower(pwd),
      category: "correct",
      message: "Correct (40 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasOnlyUpper(pwd),
      category: "correct",
      message: "Correct (40 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 10 && hasOnlyNumbers(pwd),
      category: "rapide",
      message: "Rapide à craquer (1 jour)",
   },
   {
      test: (pwd: string) => pwd.length === 10,
      category: "immédiat",
      message: "Immédiatement craqué (10, autre)",
   },

   // 11 caractères
   {
      test: (pwd: string) => pwd.length === 11 && hasAllTypes(pwd),
      category: "super",
      message: "Super (34 000 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (37k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasUpperLower(pwd),
      category: "super",
      message: "Super (2M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasLowerNumber(pwd),
      category: "super",
      message: "Super (14M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasUpperNumber(pwd),
      category: "super",
      message: "Super (14M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasOnlyLower(pwd),
      category: "super",
      message: "Super (1k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasOnlyUpper(pwd),
      category: "super",
      message: "Super (1k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 11 && hasOnlyNumbers(pwd),
      category: "rapide",
      message: "Rapide à craquer (1 semaine)",
   },
   {
      test: (pwd: string) => pwd.length === 11,
      category: "immédiat",
      message: "Immédiatement craqué (11, autre)",
   },

   // 12 caractères
   {
      test: (pwd: string) => pwd.length === 12 && hasAllTypes(pwd),
      category: "super",
      message: "Super (2 millions d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (2,3M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasUpperLower(pwd),
      category: "super",
      message: "Super (111M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasLowerNumber(pwd),
      category: "super",
      message: "Super (917M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasUpperNumber(pwd),
      category: "super",
      message: "Super (917M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasOnlyLower(pwd),
      category: "super",
      message: "Super (27k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasOnlyUpper(pwd),
      category: "super",
      message: "Super (27k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 12 && hasOnlyNumbers(pwd),
      category: "correct",
      message: "Correct (3 mois)",
   },
   {
      test: (pwd: string) => pwd.length === 12,
      category: "immédiat",
      message: "Immédiatement craqué (12, autre)",
   },

   // 13 caractères
   {
      test: (pwd: string) => pwd.length === 13 && hasAllTypes(pwd),
      category: "super",
      message: "Super (123 millions d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (284 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasUpperLower(pwd),
      category: "super",
      message: "Super (5Md ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasLowerNumber(pwd),
      category: "super",
      message: "Super (56Md ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasUpperNumber(pwd),
      category: "super",
      message: "Super (56Md ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasOnlyLower(pwd),
      category: "super",
      message: "Super (705k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasOnlyUpper(pwd),
      category: "super",
      message: "Super (705k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13 && hasOnlyNumbers(pwd),
      category: "correct",
      message: "Correct (3 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 13,
      category: "immédiat",
      message: "Immédiatement craqué (13, autre)",
   },

   // 14 caractères
   {
      test: (pwd: string) => pwd.length === 14 && hasAllTypes(pwd),
      category: "super",
      message: "Super (7 milliards d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (18k ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasUpperLower(pwd),
      category: "super",
      message: "Super (300Md ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasLowerNumber(pwd),
      category: "super",
      message: "Super (3Bn ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasUpperNumber(pwd),
      category: "super",
      message: "Super (3Bn ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasOnlyLower(pwd),
      category: "super",
      message: "Super (18M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasOnlyUpper(pwd),
      category: "super",
      message: "Super (18M ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14 && hasOnlyNumbers(pwd),
      category: "correct",
      message: "Correct (28 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 14,
      category: "immédiat",
      message: "Immédiatement craqué (14, autre)",
   },

   // 15 caractères
   {
      test: (pwd: string) => pwd.length === 15 && hasAllTypes(pwd),
      category: "super",
      message: "Super (400 milliards d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 15 && hasUpperLowerNumber(pwd),
      category: "correct",
      message: "Correct (28 000 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 15,
      category: "immédiat",
      message: "Immédiatement craqué (15, autre)",
   },

   // 16 caractères
   {
      test: (pwd: string) => pwd.length === 16 && hasAllTypes(pwd),
      category: "super",
      message: "Super (24 billions d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 16 && hasUpperLowerNumber(pwd),
      category: "correct",
      message: "Correct (284 000 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 16,
      category: "immédiat",
      message: "Immédiatement craqué (16, autre)",
   },

   // 17 caractères
   {
      test: (pwd: string) => pwd.length === 17 && hasAllTypes(pwd),
      category: "super",
      message: "Super (1,4 billiard d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 17 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (284 000 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 17,
      category: "immédiat",
      message: "Immédiatement craqué (17, autre)",
   },

   // 18 caractères
   {
      test: (pwd: string) => pwd.length === 18 && hasAllTypes(pwd),
      category: "super",
      message: "Super (87 billiards d'années)",
   },
   {
      test: (pwd: string) => pwd.length === 18 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (284 000 ans)",
   },
   {
      test: (pwd: string) => pwd.length === 18 && hasLowerNumber(pwd),
      category: "super",
      message: "Super (18, min+num)",
   },
   {
      test: (pwd: string) => pwd.length === 18 && hasOnlyLower(pwd),
      category: "super",
      message: "Super (88n ans)",
   },
   {
      test: (pwd: string) => pwd.length === 18 && hasOnlyUpper(pwd),
      category: "super",
      message: "Super (88n ans)",
   },
   {
      test: (pwd: string) => pwd.length === 18,
      category: "immédiat",
      message: "Immédiatement craqué (18, autre)",
   },

   // 19+ caractères - Toutes les variantes
   {
      test: (pwd: string) => pwd.length >= 19 && hasAllTypes(pwd),
      category: "super",
      message: "Super (plus de 144 billiards d'années)",
   },
   {
      test: (pwd: string) => pwd.length >= 19 && hasUpperLowerNumber(pwd),
      category: "super",
      message: "Super (plus de 87 billiards d'années)",
   },
   {
      test: (pwd: string) => pwd.length >= 19 && hasUpperLower(pwd),
      category: "super",
      message: "Super (plus de 2 trillions d'années)",
   },
   {
      test: (pwd: string) => pwd.length >= 19 && hasOnlyLower(pwd),
      category: "super",
      message: "Super (plus de 8 billions d'années)",
   },
   {
      test: (pwd: string) => pwd.length >= 19 && hasOnlyNumbers(pwd),
      category: "super",
      message: "Super (plus de 284 000 ans)",
   },
   {
      test: (pwd: string) =>
         pwd.length >= 19 && (hasUpperNumber(pwd) || hasLowerNumber(pwd)),
      category: "super",
      message: "Super (plus de 284 000 ans)",
   },
];

function getPasswordCategory(password: string): {
   category: string;
   message: string;
} {
   // Parcourir les règles dans l'ordre et retourner la première qui correspond
   for (const rule of PASSWORD_STRENGTH_RULES) {
      if (rule.test(password)) {
         return { category: rule.category, message: rule.message };
      }
   }

   // Par défaut (ne devrait jamais arriver)
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
   showPassword: boolean = false;

   // Suivi de chaque critère pour affichage des icônes
   criteria = [
      { name: "Au moins 8 caractères", valid: false },
      { name: "Une majuscule", valid: false },
      { name: "Une minuscule", valid: false },
      { name: "Un chiffre", valid: false },
      { name: "Un caractère spécial", valid: false },
   ];

   toggleShowPassword() {
      this.showPassword = !this.showPassword;
   }

   checkPassword() {
      this.criteria[0].valid = this.password.length >= 8;
      this.criteria[1].valid = /[A-Z]/.test(this.password);
      this.criteria[2].valid = /[a-z]/.test(this.password);
      this.criteria[3].valid = /[0-9]/.test(this.password);
      this.criteria[4].valid = /[^A-Za-z0-9]/.test(this.password);

      // Appelle la logique de catégorisation
      const evaluation = getPasswordCategory(this.password);
      this.category = evaluation.category;
      this.message = evaluation.message;
      this.result = `Catégorie : ${this.category}`;
   }

   ngOnDestroy() {
      this.password = "";
   }
}
