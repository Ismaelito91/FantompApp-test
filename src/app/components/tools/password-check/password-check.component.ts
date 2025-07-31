import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";

export interface PasswordCrackingData {
   characters: number;
   numbersOnly: {
      time: string;
   };
   lowercaseOnly: {
      time: string;
   };
   mixedCase: {
      time: string;
   };
   numbersAndLetters: {
      time: string;
   };
   allCharacters: {
      time: string;
   };
}

// Calculateur de sécurité des mots de passe basé sur le tableau Hive Systems 2025
export class PasswordSecurityCalculator {
   public readonly crackingTimeData: PasswordCrackingData[] = [
      {
         characters: 4,
         numbersOnly: { time: "Instantané" },
         lowercaseOnly: { time: "Instantané" },
         mixedCase: { time: "Instantané" },
         numbersAndLetters: { time: "Instantané" },
         allCharacters: { time: "Instantané" },
      },
      {
         characters: 5,
         numbersOnly: { time: "Instantané" },
         lowercaseOnly: { time: "Instantané" },
         mixedCase: { time: "57 minutes" },
         numbersAndLetters: { time: "2 heures" },
         allCharacters: { time: "4 heures" },
      },
      {
         characters: 6,
         numbersOnly: { time: "Instantané" },
         lowercaseOnly: { time: "46 minutes" },
         mixedCase: { time: "2 jours" },
         numbersAndLetters: { time: "6 jours" },
         allCharacters: { time: "2 semaines" },
      },
      {
         characters: 7,
         numbersOnly: { time: "Instantané" },
         lowercaseOnly: { time: "20 heures" },
         mixedCase: { time: "4 mois" },
         numbersAndLetters: { time: "1 an" },
         allCharacters: { time: "2 ans" },
      },
      {
         characters: 8,
         numbersOnly: { time: "Instantané" },
         lowercaseOnly: { time: "3 semaines" },
         mixedCase: { time: "15 ans" },
         numbersAndLetters: { time: "62 ans" },
         allCharacters: { time: "164 ans" },
      },
      {
         characters: 9,
         numbersOnly: { time: "2 heures" },
         lowercaseOnly: { time: "2 ans" },
         mixedCase: { time: "791 ans" },
         numbersAndLetters: { time: "3k ans" },
         allCharacters: { time: "11k ans" },
      },
      {
         characters: 10,
         numbersOnly: { time: "1 jour" },
         lowercaseOnly: { time: "40 ans" },
         mixedCase: { time: "41k ans" },
         numbersAndLetters: { time: "238k ans" },
         allCharacters: { time: "803k ans" },
      },
      {
         characters: 11,
         numbersOnly: { time: "1 semaine" },
         lowercaseOnly: { time: "1k ans" },
         mixedCase: { time: "2M ans" },
         numbersAndLetters: { time: "14M ans" },
         allCharacters: { time: "56M ans" },
      },
      {
         characters: 12,
         numbersOnly: { time: "3 mois" },
         lowercaseOnly: { time: "27k ans" },
         mixedCase: { time: "111M ans" },
         numbersAndLetters: { time: "917M ans" },
         allCharacters: { time: "3Md ans" },
      },
      {
         characters: 13,
         numbersOnly: { time: "3 ans" },
         lowercaseOnly: { time: "705k ans" },
         mixedCase: { time: "5Md ans" },
         numbersAndLetters: { time: "56Md ans" },
         allCharacters: { time: "275Md ans" },
      },
      {
         characters: 14,
         numbersOnly: { time: "28 ans" },
         lowercaseOnly: { time: "18M ans" },
         mixedCase: { time: "300Md ans" },
         numbersAndLetters: { time: "3Bn ans" },
         allCharacters: { time: "19Bn ans" },
      },
      {
         characters: 15,
         numbersOnly: { time: "284 ans" },
         lowercaseOnly: { time: "477M ans" },
         mixedCase: { time: "15Bn ans" },
         numbersAndLetters: { time: "218Bn ans" },
         allCharacters: { time: "1Bd ans" },
      },
      {
         characters: 16,
         numbersOnly: { time: "2k ans" },
         lowercaseOnly: { time: "12Md ans" },
         mixedCase: { time: "812Bn ans" },
         numbersAndLetters: { time: "13Bd ans" },
         allCharacters: { time: "94Bd ans" },
      },
      {
         characters: 17,
         numbersOnly: { time: "28k ans" },
         lowercaseOnly: { time: "322Md ans" },
         mixedCase: { time: "42Bd ans" },
         numbersAndLetters: { time: "840Bd ans" },
         allCharacters: { time: "6Tn ans" },
      },
      {
         characters: 18,
         numbersOnly: { time: "284k ans" },
         lowercaseOnly: { time: "8Bn ans" },
         mixedCase: { time: "2Tn ans" },
         numbersAndLetters: { time: "52Tn ans" },
         allCharacters: { time: "463Tn ans" },
      },
   ];

   getCrackingDataByLength(length: number): PasswordCrackingData | undefined {
      if (length < 4) {
         return this.crackingTimeData.find((data) => data.characters === 4);
      }

      if (length > 18) {
         return this.crackingTimeData.find((data) => data.characters === 18);
      }

      return this.crackingTimeData.find((data) => data.characters === length);
   }

   private getEvaluationResult(
      length: number,
      type:
         | "numbersOnly"
         | "lowercaseOnly"
         | "mixedCase"
         | "numbersAndLetters"
         | "allCharacters",
      strengthLevel: string
   ): {
      length: number;
      type:
         | "numbersOnly"
         | "lowercaseOnly"
         | "mixedCase"
         | "numbersAndLetters"
         | "allCharacters";
      crackingTime: string;
      strengthLevel: string;
   } {
      const data = this.getCrackingDataByLength(length);

      if (!data) {
         return {
            length,
            type,
            crackingTime: "Données non disponibles",
            strengthLevel,
         };
      }

      const crackingInfo = data[type];

      return {
         length,
         type,
         crackingTime: crackingInfo.time,
         strengthLevel,
      };
   }

   /**
    * Évalue la force d'un mot de passe basé sur sa longueur et sa composition
    * Utilise le tableau Hive Systems 2025 pour déterminer le temps de craquage
    */
   evaluatePasswordStrength(password: string): {
      length: number;
      type:
         | "numbersOnly"
         | "lowercaseOnly"
         | "mixedCase"
         | "numbersAndLetters"
         | "allCharacters";
      crackingTime: string;
      strengthLevel: string;
   } {
      const length = password.length;
      const hasNumbers = /\d/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasSpecialChars = /[^a-zA-Z0-9]/.test(password);

      let type:
         | "numbersOnly"
         | "lowercaseOnly"
         | "mixedCase"
         | "numbersAndLetters"
         | "allCharacters";
      let strengthLevel: string;

      // 1. Chiffres uniquement
      if (hasNumbers && !hasLowercase && !hasUppercase && !hasSpecialChars) {
         type = "numbersOnly";
         strengthLevel = "Très faible";
         return this.getEvaluationResult(length, type, strengthLevel);
      }

      // 2. Minuscules uniquement
      if (hasLowercase && !hasNumbers && !hasUppercase && !hasSpecialChars) {
         type = "lowercaseOnly";
         strengthLevel = "Faible";
         return this.getEvaluationResult(length, type, strengthLevel);
      }

      // 3. Majuscules et/ou minuscules (sans chiffres ni caractères spéciaux)
      if ((hasLowercase || hasUppercase) && !hasNumbers && !hasSpecialChars) {
         type = "mixedCase";
         strengthLevel = "Moyen";
         return this.getEvaluationResult(length, type, strengthLevel);
      }

      // 4. Chiffres + lettres (sans caractères spéciaux)
      if (hasNumbers && (hasLowercase || hasUppercase) && !hasSpecialChars) {
         type = "numbersAndLetters";
         strengthLevel = "Bon";
         return this.getEvaluationResult(length, type, strengthLevel);
      }

      // 5. Tous types de caractères (par défaut)
      type = "allCharacters";
      strengthLevel = "Excellent";
      return this.getEvaluationResult(length, type, strengthLevel);
   }

   /**
    * Génère des recommandations pour améliorer un mot de passe
    */
   generatePasswordRecommendations(password: string): string[] {
      const recommendations: string[] = [];

      if (password.length < 12) {
         recommendations.push(
            "Utilisez au moins 12 caractères pour une sécurité optimale"
         );
      }

      if (!/\d/.test(password)) {
         recommendations.push("Ajoutez des chiffres à votre mot de passe");
      }

      if (!/[a-z]/.test(password)) {
         recommendations.push("Incluez des lettres minuscules");
      }

      if (!/[A-Z]/.test(password)) {
         recommendations.push("Incluez des lettres majuscules");
      }

      if (!/[^a-zA-Z0-9]/.test(password)) {
         recommendations.push("Ajoutez des caractères spéciaux (!@#$%^&*)");
      }

      return recommendations;
   }

   /**
    * Retourne toutes les données formatées pour l'affichage en tableau
    */
   getFormattedTableData(): any[] {
      return this.crackingTimeData.map((data) => ({
         characters: data.characters,
         numbersOnly: data.numbersOnly,
         lowercaseOnly: data.lowercaseOnly,
         mixedCase: data.mixedCase,
         numbersAndLetters: data.numbersAndLetters,
         allCharacters: data.allCharacters,
      }));
   }
}

// Instance exportée pour utilisation dans les composants Angular
export const passwordCalculator = new PasswordSecurityCalculator();

@Component({
   selector: "app-password-check",
   imports: [
      ButtonBackComponent,
      FormsModule,
      CommonModule,
   ],
   templateUrl: "./password-check.component.html",
   styleUrl: "./password-check.component.scss",
})
export class PasswordCheckComponent implements OnDestroy, OnInit {
   password: string = "";
   result: string = "";
   category: string = "";
   message: string = "";
   showPassword: boolean = false;
   showInfoModal: boolean = false;
   showPasswordInfoModal: boolean = false;
   hasSeenOnboarding: boolean = false;
   isInputFocused: boolean = false;

   constructor() {
      // Vérifie si c'est la première fois que l'utilisateur utilise l'app
      const hasSeenOnboarding = localStorage.getItem(
         "password-check-onboarding-seen"
      );
      this.hasSeenOnboarding = !!hasSeenOnboarding;
   }

   ngOnInit() {
      console.log("ngOnInit - hasSeenOnboarding:", this.hasSeenOnboarding);

      // Si c'est la première fois, affiche l'onboarding immédiatement
      if (!this.hasSeenOnboarding) {
         console.log("Première visite - affichage de l'onboarding");
         // Afficher immédiatement
         this.showInfoModal = true;
         localStorage.setItem("password-check-onboarding-seen", "true");
         console.log("Modal affichée immédiatement:", this.showInfoModal);
      }
   }

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

   toggleInfoModal() {
      this.showInfoModal = !this.showInfoModal;
   }

   togglePasswordInfoModal() {
      this.showPasswordInfoModal = !this.showPasswordInfoModal;
   }

   // Gestion du focus pour l'animation
   onInputFocus() {
      this.isInputFocused = true;
   }

   onInputBlur() {
      this.isInputFocused = false;
   }

   cancelInputFocus() {
      this.isInputFocused = false;
   }

   checkPassword() {
      // Vérification des critères de base pour l'affichage des icônes
      this.criteria[0].valid = this.password.length >= 8;
      this.criteria[1].valid = /[A-Z]/.test(this.password);
      this.criteria[2].valid = /[a-z]/.test(this.password);
      this.criteria[3].valid = /[0-9]/.test(this.password);
      this.criteria[4].valid = /[^A-Za-z0-9]/.test(this.password);

      // Évaluation de la force du mot de passe avec le tableau Hive Systems 2025
      if (this.password.length > 0) {
         const evaluation = passwordCalculator.evaluatePasswordStrength(
            this.password
         );
         this.category = evaluation.strengthLevel;
         this.message = `${evaluation.crackingTime} (${evaluation.type})`;
         this.result = `Niveau : ${this.category}`;
      } else {
         this.result = "";
         this.message = "";
         this.category = "";
      }
   }

   ngOnDestroy() {
      this.password = "";
   }
}
