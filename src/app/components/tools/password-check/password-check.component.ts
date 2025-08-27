import { CommonModule, Location } from "@angular/common";
import {
   Component,
   OnDestroy,
   OnInit,
   ElementRef,
   ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonCloseComponent } from "../../design-system/button-close/button-close.component";
import { BadgeComponent } from "../../design-system/badge/badge.component";

export interface PasswordCrackingData {
   characters: number;
   numbersOnly: {
      time: string;
      color: string;
   };
   lowercaseOnly: {
      time: string;
      color: string;
   };
   mixedCase: {
      time: string;
      color: string;
   };
   numbersAndLetters: {
      time: string;
      color: string;
   };
   allCharacters: {
      time: string;
      color: string;
   };
}

// Calculateur de sécurité des mots de passe basé sur le tableau Hive Systems 2025
export class PasswordSecurityCalculator {
   public readonly crackingTimeData: PasswordCrackingData[] = [
      {
         characters: 4,
         numbersOnly: { time: "Instantané", color: "purple" },
         lowercaseOnly: { time: "Instantané", color: "purple" },
         mixedCase: { time: "Instantané", color: "purple" },
         numbersAndLetters: { time: "Instantané", color: "purple" },
         allCharacters: { time: "Instantané", color: "purple" },
      },
      {
         characters: 5,
         numbersOnly: { time: "Instantané", color: "purple" },
         lowercaseOnly: { time: "Instantané", color: "purple" },
         mixedCase: { time: "57 minutes", color: "red" },
         numbersAndLetters: { time: "2 heures", color: "red" },
         allCharacters: { time: "4 heures", color: "red" },
      },
      {
         characters: 6,
         numbersOnly: { time: "Instantané", color: "purple" },
         lowercaseOnly: { time: "46 minutes", color: "red" },
         mixedCase: { time: "2 jours", color: "red" },
         numbersAndLetters: { time: "6 jours", color: "red" },
         allCharacters: { time: "2 semaines", color: "red" },
      },
      {
         characters: 7,
         numbersOnly: { time: "Instantané", color: "purple" },
         lowercaseOnly: { time: "20 heures", color: "red" },
         mixedCase: { time: "4 mois", color: "red" },
         numbersAndLetters: { time: "1 an", color: "red" },
         allCharacters: { time: "2 ans", color: "orange" },
      },
      {
         characters: 8,
         numbersOnly: { time: "Instantané", color: "purple" },
         lowercaseOnly: { time: "3 semaines", color: "red" },
         mixedCase: { time: "15 ans", color: "orange" },
         numbersAndLetters: { time: "62 ans", color: "orange" },
         allCharacters: { time: "164 ans", color: "orange" },
      },
      {
         characters: 9,
         numbersOnly: { time: "2 heures", color: "red" },
         lowercaseOnly: { time: "2 ans", color: "orange" },
         mixedCase: { time: "791 ans", color: "orange" },
         numbersAndLetters: { time: "3 000 ans", color: "orange" },
         allCharacters: { time: "11 000 ans", color: "orange" },
      },
      {
         characters: 10,
         numbersOnly: { time: "1 jour", color: "red" },
         lowercaseOnly: { time: "40 ans", color: "orange" },
         mixedCase: { time: "41 000 ans", color: "orange" },
         numbersAndLetters: { time: "238 000 ans", color: "yellow" },
         allCharacters: { time: "803 000 ans", color: "yellow" },
      },
      {
         characters: 11,
         numbersOnly: { time: "1 semaine", color: "red" },
         lowercaseOnly: { time: "1 000 ans", color: "orange" },
         mixedCase: { time: "2 millions d'années", color: "yellow" },
         numbersAndLetters: { time: "14 millions d'années", color: "yellow" },
         allCharacters: { time: "56 millions d'années", color: "yellow" },
      },
      {
         characters: 12,
         numbersOnly: { time: "3 mois", color: "red" },
         lowercaseOnly: { time: "27 000 ans", color: "orange" },
         mixedCase: { time: "111 millions d'années", color: "yellow" },
         numbersAndLetters: { time: "917 millions d'années", color: "yellow" },
         allCharacters: { time: "3 milliards d'années", color: "yellow" },
      },
      {
         characters: 13,
         numbersOnly: { time: "3 ans", color: "orange" },
         lowercaseOnly: { time: "705 000 ans", color: "yellow" },
         mixedCase: { time: "5 milliards d'années", color: "yellow" },
         numbersAndLetters: { time: "56 milliards d'années", color: "green" },
         allCharacters: { time: "275 milliards d'années", color: "green" },
      },
      {
         characters: 14,
         numbersOnly: { time: "28 ans", color: "orange" },
         lowercaseOnly: { time: "18 millions d'années", color: "yellow" },
         mixedCase: { time: "300 milliards d'années", color: "green" },
         numbersAndLetters: { time: "3 billions d'années", color: "green" },
         allCharacters: { time: "19 billions d'années", color: "green" },
      },
      {
         characters: 15,
         numbersOnly: { time: "284 ans", color: "orange" },
         lowercaseOnly: { time: "477 millions d'années", color: "yellow" },
         mixedCase: { time: "15 billions d'années", color: "green" },
         numbersAndLetters: { time: "218 billions d'années", color: "green" },
         allCharacters: { time: "1 billion d'années", color: "green" },
      },
      {
         characters: 16,
         numbersOnly: { time: "2 000 ans", color: "orange" },
         lowercaseOnly: { time: "12 milliards d'années", color: "green" },
         mixedCase: { time: "812 billions d'années", color: "green" },
         numbersAndLetters: { time: "13 billions d'années", color: "green" },
         allCharacters: { time: "94 billions d'années", color: "green" },
      },
      {
         characters: 17,
         numbersOnly: { time: "28 000 ans", color: "orange" },
         lowercaseOnly: { time: "322 milliards d'années", color: "green" },
         mixedCase: { time: "42 billions d'années", color: "green" },
         numbersAndLetters: { time: "840 billions d'années", color: "green" },
         allCharacters: { time: "6 trillions d'années", color: "green" },
      },
      {
         characters: 18,
         numbersOnly: { time: "284 000 ans", color: "yellow" },
         lowercaseOnly: { time: "8 billions d'années", color: "green" },
         mixedCase: { time: "2 trillions d'années", color: "green" },
         numbersAndLetters: { time: "52 trillions d'années", color: "green" },
         allCharacters: { time: "463 trillions d'années", color: "green" },
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
      color: string;
   } {
      const data = this.getCrackingDataByLength(length);

      if (!data) {
         return {
            length,
            type,
            crackingTime: "Données non disponibles",
            strengthLevel,
            color: "purple",
         };
      }

      const crackingInfo = data[type];

      return {
         length,
         type,
         crackingTime: crackingInfo.time,
         strengthLevel,
         color: crackingInfo.color,
      };
   }
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
      color: string;
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
      ButtonCloseComponent,
      FormsModule,
      CommonModule,
      BadgeComponent,
   ],
   templateUrl: "./password-check.component.html",
   styleUrl: "./password-check.component.scss",
})
export class PasswordCheckComponent implements OnDestroy, OnInit {
   @ViewChild("passwordInput", { static: false })
   passwordInput!: ElementRef<HTMLInputElement>;

   password: string = "";
   result: string = "";
   category: string = "";
   message: string = "";
   showPassword: boolean = false;
   showInfoModal: boolean = false;
   showPasswordInfoModal: boolean = false;
   hasSeenOnboarding: boolean = false;
   isInputFocused: boolean = false;
   showPasswordResults: boolean = false;
   isRapidCracking: boolean = false;
   passwordResultLevel: string = "";
   showCopyNotification: boolean = false;

   // Propriétés pour l'effet typewriter
   displayedMessage: string = "";
   fullMessage: string = "";
   typewriterInterval: any;
   calculatedFontSize: number = 96; // Taille calculée en px

   constructor(private router: Router, private location: Location) {
      // Vérifie si c'est la première fois que l'utilisateur utilise l'app
      const hasSeenOnboarding = localStorage.getItem(
         "password-check-onboarding-seen"
      );
      this.hasSeenOnboarding = !!hasSeenOnboarding;
   }

   ngOnInit() {
      // Si c'est la première fois, affiche l'onboarding immédiatement
      if (!this.hasSeenOnboarding) {
         // Afficher immédiatement
         this.showInfoModal = true;
         localStorage.setItem("password-check-onboarding-seen", "true");
      }
   }

   // Suivi de chaque critère pour affichage des icônes
   criteria = [
      { name: "12 caractères minimum", valid: false },
      { name: "1 majuscule au moins", valid: false },
      { name: "1 minuscule au moins", valid: false },
      { name: "1 chiffre au moins", valid: false },
      { name: "1 caractère spécial au moins", valid: false },
   ];

   toggleShowPassword() {
      this.showPassword = !this.showPassword;
   }

   async copyPassword() {
      if (!this.password) {
         return;
      }

      try {
         // Utilise l'API moderne du clipboard
         if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(this.password);

            // Afficher la notification de succès
            this.showCopyNotification = true;

            // Masquer la notification après 2 secondes
            setTimeout(() => {
               this.showCopyNotification = false;
            }, 2000);
         }
      } catch (err) {
         // Gestion silencieuse des erreurs de copie
         console.error("Erreur lors de la copie:", err);
      }
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
      this.showPasswordResults = false;
   }

   cancelInputFocus() {
      this.isInputFocused = false;
      this.showPasswordResults = false;
   }

   resetResults() {
      // Nettoie d'abord les données sensibles
      this.password = "";
      this.showPasswordResults = false;
      this.isRapidCracking = false;
      this.passwordResultLevel = "";
      this.result = "";
      this.message = "";
      this.category = "";
      this.displayedMessage = "";
      this.fullMessage = "";
      this.calculatedFontSize = 96;
      this.isInputFocused = false; // Remet l'input en état non-focus
      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }

      // Retourne à la page précédente (d'où on est venu)
      this.location.back();
   }

   // Calcule directement la taille en pixels - SIMPLE ET DIRECT
   calculateSimpleFontSize(text: string): number {
      const digitCount = (text.match(/\d/g) || []).length;
      const letterCount = (text.match(/[a-zA-ZÀ-ÿ]/g) || []).length;
      const totalRelevantChars = digitCount + letterCount;

      // Détermine la taille de base
      let baseSize = 96; // Par défaut lettres
      if (totalRelevantChars > 0) {
         const digitRatio = digitCount / totalRelevantChars;
         baseSize = digitRatio > 0.5 ? 127 : 96; // Chiffres vs lettres
      }

      // Réduction selon la longueur
      const length = text.length;
      let reduction = 1; // Pas de réduction par défaut

      if (length <= 3) {
         reduction = 1; // 100%
      } else if (length <= 8) {
         reduction = 0.7; // 70%
      } else if (length <= 15) {
         reduction = 0.5; // 50%
      } else if (length <= 25) {
         reduction = 0.3; // 30%
      } else {
         reduction = 0.2; // 20%
      }

      const finalSize = Math.round(baseSize * reduction);
      const result = Math.max(18, finalSize); // Minimum 18px

      return result;
   }

   // Effet typewriter lettre par lettre
   startTypewriterEffect(text: string) {
      this.fullMessage = text;
      this.displayedMessage = "";
      this.calculatedFontSize = this.calculateSimpleFontSize(text); // Calcul direct

      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }

      let currentIndex = 0;
      this.typewriterInterval = setInterval(() => {
         if (currentIndex < this.fullMessage.length) {
            this.displayedMessage += this.fullMessage.charAt(currentIndex);
            currentIndex++;
         } else {
            clearInterval(this.typewriterInterval);
         }
      }, 50); // 50ms entre chaque lettre
   }

   handleButtonClick() {
      // Si on affiche les résultats, "Renforcer mon mdp" ramène à l'état actif (input focus)
      if (this.showPasswordResults) {
         this.showPasswordResults = false;
         this.isInputFocused = true;
         setTimeout(() => {
            if (this.passwordInput) {
               this.passwordInput.nativeElement.focus();
            }
         }, 100);
         return;
      }

      // Si il y a du texte dans l'input, tester le mot de passe (peu importe le focus)
      if (this.password.length > 0) {
         this.checkPassword();
         return;
      }

      // Si pas de texte et input pas focus, montrer l'info sur les bons mots de passe
      if (this.password.length === 0 && !this.isInputFocused) {
         this.togglePasswordInfoModal();
         return;
      }

      // Si pas de texte mais input focus, ne rien faire
      if (this.password.length === 0 && this.isInputFocused) {
         return;
      }
   }

   checkPassword() {
      // Afficher les résultats seulement quand on clique sur le bouton
      this.showPasswordResults = true;

      // Vérification des critères de base pour l'affichage des icônes
      this.criteria[0].valid = this.password.length >= 12;
      this.criteria[1].valid = /[A-Z]/.test(this.password);
      this.criteria[2].valid = /[a-z]/.test(this.password);
      this.criteria[3].valid = /[0-9]/.test(this.password);
      this.criteria[4].valid = /[^A-Za-z0-9]/.test(this.password);

      if (this.password.length > 0) {
         const evaluation = passwordCalculator.evaluatePasswordStrength(
            this.password
         );
         this.category = evaluation.strengthLevel;
         this.message = evaluation.crackingTime;
         this.result = `Niveau : ${this.category}`;

         // Démarrer l'effet typewriter pour le message
         setTimeout(() => {
            this.startTypewriterEffect(evaluation.crackingTime);
         }, 300); // Petit délai pour que l'interface se mette en place

         // Vérification des critères de sécurité
         const hasMinLength = this.password.length >= 12;
         const hasUppercase = /[A-Z]/.test(this.password);
         const hasLowercase = /[a-z]/.test(this.password);
         const hasNumbers = /\d/.test(this.password);
         const hasSpecialChars = /[^a-zA-Z0-9]/.test(this.password);
         const allCriteriaValid =
            hasMinLength &&
            hasUppercase &&
            hasLowercase &&
            hasNumbers &&
            hasSpecialChars;

         let baseLevel = "";
         switch (evaluation.color) {
            case "purple":
               baseLevel = "immediate"; // Violet = Instantané
               break;
            case "red":
               baseLevel = "rapid"; // Rouge = C'est rapide
               break;
            case "orange":
               baseLevel = "correct"; // Orange = Correct
               break;
            case "yellow":
            case "green":
               baseLevel = "super"; // Jaune/Vert = Super
               break;
            default:
               baseLevel = "correct"; // Par défaut si couleur inconnue
         }

         // Si le niveau serait "super" mais que tous les critères ne sont pas remplis, on descend à "correct"
         if (baseLevel === "super" && !allCriteriaValid) {
            this.passwordResultLevel = "correct";
            this.isRapidCracking = true;
         } else {
            this.passwordResultLevel = baseLevel;
            this.isRapidCracking = baseLevel !== "super";
         }
      } else {
         this.result = "";
         this.message = "";
         this.category = "";
         this.isRapidCracking = false;
      }
   }

   // Méthode pour déterminer le badge approprié selon le niveau de résultat
   getBadgeInfo(): {
      title: string;
      variant: "success" | "danger" | "danger-light" | "info";
   } | null {
      if (!this.showPasswordResults || !this.passwordResultLevel) {
         return null;
      }

      switch (this.passwordResultLevel) {
         case "immediate":
            return { title: "C'EST IMMÉDIAT ⚠️", variant: "danger" };
         case "rapid":
            return { title: "C'EST RAPIDE 😬", variant: "danger-light" };
         case "correct":
            return { title: "C'EST CORRECT 🙂", variant: "info" };
         case "super":
            return { title: "C'EST SUPER 😎", variant: "success" };
         default:
            return null;
      }
   }

   ngOnDestroy() {
      this.password = "";
      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }
   }
}
