import { CommonModule, Location } from "@angular/common";
import {
   Component,
   OnDestroy,
   OnInit,
   AfterViewInit,
   ElementRef,
   ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonCloseComponent } from "../../design-system/button-close/button-close.component";
import { BadgeComponent } from "../../design-system/badge/badge.component";

export interface PasswordCrackingData {
   characters: number;
   numbersOnly: {
      value: string;
      unit: string;
      color: string;
   };
   lowercaseOnly: {
      value: string;
      unit: string;
      color: string;
   };
   mixedCase: {
      value: string;
      unit: string;
      color: string;
   };
   numbersAndLetters: {
      value: string;
      unit: string;
      color: string;
   };
   allCharacters: {
      value: string;
      unit: string;
      color: string;
   };
}
export class PasswordSecurityCalculator {
   // source : https://www.francenum.gouv.fr/magazine-du-numerique/combien-de-temps-un-pirate-met-il-pour-trouver-votre-mot-de-passe-comment 
   public readonly crackingTimeData: PasswordCrackingData[] = [
      {
         characters: 4,
         numbersOnly: { value: "", unit: "INSTANT", color: "purple" },
         lowercaseOnly: { value: "", unit: "INSTANT", color: "purple" },
         mixedCase: { value: "", unit: "INSTANT", color: "purple" },
         numbersAndLetters: { value: "", unit: "INSTANT", color: "purple" },
         allCharacters: { value: "", unit: "INSTANT", color: "purple" },
      },
      {
         characters: 5,
         numbersOnly: { value: "", unit: "INSTANT", color: "purple" },
         lowercaseOnly: { value: "", unit: "INSTANT", color: "purple" },
         mixedCase: { value: "57", unit: "MINUTES", color: "red" },
         numbersAndLetters: { value: "2", unit: "HOURS", color: "red" },
         allCharacters: { value: "4", unit: "HOURS", color: "red" },
      },
      {
         characters: 6,
         numbersOnly: { value: "", unit: "INSTANT", color: "purple" },
         lowercaseOnly: { value: "", unit: "INSTANT", color: "purple" },
         mixedCase: { value: "46", unit: "MINUTES", color: "red" },
         numbersAndLetters: { value: "2", unit: "DAYS", color: "red" },
         allCharacters: { value: "2", unit: "WEEKS", color: "red" },
      },
      {
         characters: 7,
         numbersOnly: { value: "", unit: "INSTANT", color: "purple" },
         lowercaseOnly: { value: "20", unit: "HOURS", color: "red" },
         mixedCase: { value: "4", unit: "MONTHS", color: "red" },
         numbersAndLetters: { value: "1", unit: "YEAR", color: "red" },
         allCharacters: { value: "2", unit: "YEARS", color: "orange" },
      },
      {
         characters: 8,
         numbersOnly: { value: "", unit: "INSTANT", color: "purple" },
         lowercaseOnly: { value: "3", unit: "WEEKS", color: "red" },
         mixedCase: { value: "15", unit: "YEARS", color: "orange" },
         numbersAndLetters: { value: "62", unit: "YEARS", color: "orange" },
         allCharacters: { value: "164", unit: "YEARS", color: "orange" },
      },
      {
         characters: 9,
         numbersOnly: { value: "", unit: "INSTANT", color: "purple" },
         lowercaseOnly: { value: "2", unit: "HOURS", color: "red" },
         mixedCase: { value: "791", unit: "YEARS", color: "orange" },
         numbersAndLetters: { value: "3000", unit: "YEARS", color: "orange" },
         allCharacters: { value: "11000", unit: "YEARS", color: "orange" },
      },
      {
         characters: 10,
         numbersOnly: { value: "1", unit: "DAYS", color: "red" },
         lowercaseOnly: { value: "40", unit: "YEARS", color: "orange" },
         mixedCase: { value: "41000", unit: "YEARS", color: "orange" },
         numbersAndLetters: { value: "238000", unit: "YEARS", color: "yellow" },
         allCharacters: { value: "803000", unit: "YEARS", color: "yellow" },
      },
      {
         characters: 11,
         numbersOnly: { value: "1", unit: "WEEKS", color: "red" },
         lowercaseOnly: { value: "1000", unit: "YEARS", color: "orange" },
         mixedCase: { value: "2", unit: "MILLION_YEARS", color: "yellow" },
         numbersAndLetters: {
            value: "14",
            unit: "MILLION_YEARS",
            color: "yellow",
         },
         allCharacters: { value: "56", unit: "MILLION_YEARS", color: "yellow" },
      },
      {
         characters: 12,
         numbersOnly: { value: "3", unit: "MONTHS", color: "red" },
         lowercaseOnly: { value: "27000", unit: "YEARS", color: "orange" },
         mixedCase: { value: "111", unit: "MILLION_YEARS", color: "yellow" },
         numbersAndLetters: {
            value: "917",
            unit: "MILLION_YEARS",
            color: "yellow",
         },
         allCharacters: { value: "3", unit: "BILLION_YEARS", color: "yellow" },
      },
      {
         characters: 13,
         numbersOnly: { value: "3", unit: "YEARS", color: "orange" },
         lowercaseOnly: { value: "705000", unit: "YEARS", color: "yellow" },
         mixedCase: { value: "5", unit: "BILLION_YEARS", color: "yellow" },
         numbersAndLetters: {
            value: "56",
            unit: "BILLION_YEARS",
            color: "green",
         },
         allCharacters: { value: "275", unit: "BILLION_YEARS", color: "green" },
      },
      {
         characters: 14,
         numbersOnly: { value: "28", unit: "YEARS", color: "orange" },
         lowercaseOnly: { value: "18", unit: "MILLION_YEARS", color: "yellow" },
         mixedCase: { value: "300", unit: "BILLION_YEARS", color: "green" },
         numbersAndLetters: {
            value: "3",
            unit: "TRILLION_YEARS",
            color: "green",
         },
         allCharacters: { value: "19", unit: "TRILLION_YEARS", color: "green" },
      },
      {
         characters: 15,
         numbersOnly: { value: "284", unit: "YEARS", color: "orange" },
         lowercaseOnly: {
            value: "477",
            unit: "MILLION_YEARS",
            color: "yellow",
         },
         mixedCase: { value: "15", unit: "TRILLION_YEARS", color: "green" },
         numbersAndLetters: {
            value: "218",
            unit: "TRILLION_YEARS",
            color: "green",
         },
         allCharacters: { value: "1", unit: "TRILLION_YEARS", color: "green" },
      },
      {
         characters: 16,
         numbersOnly: { value: "2000", unit: "YEARS", color: "orange" },
         lowercaseOnly: { value: "12", unit: "BILLION_YEARS", color: "green" },
         mixedCase: { value: "812", unit: "TRILLION_YEARS", color: "green" },
         numbersAndLetters: {
            value: "13",
            unit: "TRILLION_YEARS",
            color: "green",
         },
         allCharacters: { value: "94", unit: "TRILLION_YEARS", color: "green" },
      },
      {
         characters: 17,
         numbersOnly: { value: "28000", unit: "YEARS", color: "orange" },
         lowercaseOnly: { value: "322", unit: "BILLION_YEARS", color: "green" },
         mixedCase: { value: "42", unit: "TRILLION_YEARS", color: "green" },
         numbersAndLetters: {
            value: "840",
            unit: "TRILLION_YEARS",
            color: "green",
         },
         allCharacters: {
            value: "6",
            unit: "QUADRILLION_YEARS",
            color: "green",
         },
      },
      {
         characters: 18,
         numbersOnly: { value: "284000", unit: "YEARS", color: "yellow" },
         lowercaseOnly: { value: "8", unit: "TRILLION_YEARS", color: "green" },
         mixedCase: { value: "2", unit: "QUADRILLION_YEARS", color: "green" },
         numbersAndLetters: {
            value: "52",
            unit: "QUADRILLION_YEARS",
            color: "green",
         },
         allCharacters: {
            value: "463",
            unit: "QUADRILLION_YEARS",
            color: "green",
         },
      },
   ];

   // Méthode pour traduire un temps de craquage
   public translateTime(
      value: string,
      unit: string,
      translateService: any
   ): string {
      if (unit === "INSTANT") {
         const translated = translateService.instant(
            "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
         );
         // Si la traduction n'est pas chargée, retourner une valeur par défaut
         return translated === "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
            ? "Instantané"
            : translated;
      }

      const translatedUnit = translateService.instant(
         `TOOLS.PASSWORD_CHECK.TIME_UNITS.${unit}`
      );
      // Si la traduction n'est pas chargée, retourner une valeur par défaut
      if (translatedUnit === `TOOLS.PASSWORD_CHECK.TIME_UNITS.${unit}`) {
         // Valeurs par défaut en français
         const defaultUnits: { [key: string]: string } = {
            MINUTES: "minutes",
            HOURS: "heures",
            DAY: "jour",
            DAYS: "jours",
            WEEK: "semaine",
            WEEKS: "semaines",
            MONTHS: "mois",
            YEARS: "ans",
            MILLION_YEARS: "millions d'années",
            BILLION_YEARS: "milliards d'années",
            TRILLION_YEARS: "billions d'années",
            QUADRILLION_YEARS: "trillions d'années",
         };
         const defaultUnit = defaultUnits[unit] || unit.toLowerCase();
         return value ? `${value} ${defaultUnit}` : defaultUnit;
      }

      return value ? `${value} ${translatedUnit}` : translatedUnit;
   }

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
         | "allCharacters"
   ): {
      length: number;
      type:
         | "numbersOnly"
         | "lowercaseOnly"
         | "mixedCase"
         | "numbersAndLetters"
         | "allCharacters";
      crackingTime: string;
      timeValue: string;
      timeUnit: string;
      color: string;
   } {
      const data = this.getCrackingDataByLength(length);

      if (!data) {
         return {
            length,
            type,
            crackingTime: "Données non disponibles",
            timeValue: "",
            timeUnit: "INSTANT",
            color: "purple",
         };
      }

      const crackingInfo = data[type];

      return {
         length,
         type,
         crackingTime: crackingInfo.value
            ? `${crackingInfo.value} ${crackingInfo.unit}`
            : crackingInfo.unit,
         timeValue: crackingInfo.value,
         timeUnit: crackingInfo.unit,
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
      timeValue: string;
      timeUnit: string;
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

      // 0. type par défaut
      type = "lowercaseOnly";

      // 1. Chiffres uniquement
      if (hasNumbers && !hasLowercase && !hasUppercase && !hasSpecialChars) {
         type = "numbersOnly";
      }

      // 2. Minuscules uniquement
      // ou Majuscules uniquement 
      // ou caractères spéciaux uniquement
      if ((hasLowercase && !hasUppercase && !hasNumbers && !hasSpecialChars) 
            || (!hasLowercase && hasUppercase && !hasNumbers && hasSpecialChars) 
            || (!hasLowercase && !hasUppercase && !hasNumbers && hasSpecialChars) ) {
         type = "lowercaseOnly";
      }

      // 3. Majuscules et minuscules (sans chiffres ni caractères spéciaux)
      // ou Majuscules et caractères spéciaux uniquement
      // ou Majuscules et chiffres uniquement
      // ou Minuscules et caractères spéciaux uniquement
      // ou Minuscules et chiffres uniquement
      // ou chiffres et caractères spéciaux uniquement
      if ((hasLowercase && hasUppercase && !hasNumbers && !hasSpecialChars) 
            || (!hasLowercase && hasUppercase && !hasNumbers && hasSpecialChars) 
            || (!hasLowercase && hasUppercase && hasNumbers && !hasSpecialChars) 
            || (hasLowercase && !hasUppercase && !hasNumbers && hasSpecialChars) 
            || (hasLowercase && !hasUppercase && hasNumbers && !hasSpecialChars) 
            || (!hasLowercase && !hasUppercase && hasNumbers && hasSpecialChars) ) {
         type = "mixedCase";
      }

      // 4. Chiffres + Majuscules et minuscules (sans caractères spéciaux)
      // ou Chiffres + Majuscules et caractères spéciaux uniquement
      // ou Chiffres + minuscules et caractères spéciaux uniquement
      // ou minuscules et minuscules et caractères spéciaux uniquement
      if ((hasNumbers && hasLowercase && hasUppercase && !hasSpecialChars)
         || (hasNumbers && !hasLowercase && hasUppercase && hasSpecialChars)
         || (hasNumbers && hasLowercase && !hasUppercase && hasSpecialChars)
         || (!hasNumbers && hasLowercase && hasUppercase && hasSpecialChars)) {
         type = "numbersAndLetters";
      }

      // 5. Tous types de caractères (par défaut)
      if (hasNumbers && hasLowercase && hasUppercase && hasSpecialChars) {
         type = "allCharacters";
      }
      return this.getEvaluationResult(length, type);
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
      TranslateModule,
   ],
   templateUrl: "./password-check.component.html",
   styleUrl: "./password-check.component.scss",
})
export class PasswordCheckComponent
   implements OnDestroy, OnInit, AfterViewInit
{
   @ViewChild("passwordInput", { static: false })
   passwordInput!: ElementRef<HTMLInputElement>;

   password: string = "";
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

   constructor(
      private router: Router,
      private location: Location,
      private translateService: TranslateService
   ) {
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

   ngAfterViewInit() {
      // Attendre un peu et initialiser les critères quand tout est chargé
      setTimeout(() => {
         this.initializeCriteria();
      }, 100);
   }

   private initializeCriteria() {
      // Debug: vérifier si les traductions sont chargées
      const testTranslation = this.translateService.instant(
         "TOOLS.PASSWORD_CHECK.CRITERIA.MIN_LENGTH"
      );

      if (testTranslation === "TOOLS.PASSWORD_CHECK.CRITERIA.MIN_LENGTH") {
         // Les traductions ne sont pas encore chargées, réessayer plus tard
         setTimeout(() => {
            this.initializeCriteria();
         }, 200);
         return;
      }

      this.criteria = [
         {
            name: this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.CRITERIA.MIN_LENGTH"
            ),
            valid: false,
         },
         {
            name: this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.CRITERIA.UPPERCASE"
            ),
            valid: false,
         },
         {
            name: this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.CRITERIA.LOWERCASE"
            ),
            valid: false,
         },
         {
            name: this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.CRITERIA.DIGIT"
            ),
            valid: false,
         },
         {
            name: this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.CRITERIA.SPECIAL_CHAR"
            ),
            valid: false,
         },
      ];
   }

   // Suivi de chaque critère pour affichage des icônes
   criteria: { name: string; valid: boolean }[] = [];

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
      this.message = "";
      this.displayedMessage = "";
      this.fullMessage = "";
      this.calculatedFontSize = 96;
      this.isInputFocused = false; // Remet l'input en état non-focus
      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }

      // Redirection améliorée avec animation fluide
      setTimeout(() => {
         this.router.navigate(["/home"], {
            replaceUrl: true,
            state: { animation: "slideOut" },
         });
      }, 200);
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

         // Traduire le temps de craquage
         const translatedTime = passwordCalculator.translateTime(
            evaluation.timeValue,
            evaluation.timeUnit,
            this.translateService
         );

         this.message = translatedTime;

         // Démarrer l'effet typewriter pour le message
         setTimeout(() => {
            this.startTypewriterEffect(translatedTime);
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
         this.message = "";
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
            return {
               title: this.translateService.instant(
                  "TOOLS.PASSWORD_CHECK.BADGES.IMMEDIATE"
               ),
               variant: "danger",
            };
         case "rapid":
            return {
               title: this.translateService.instant(
                  "TOOLS.PASSWORD_CHECK.BADGES.RAPID"
               ),
               variant: "danger-light",
            };
         case "correct":
            return {
               title: this.translateService.instant(
                  "TOOLS.PASSWORD_CHECK.BADGES.CORRECT"
               ),
               variant: "info",
            };
         case "super":
            return {
               title: this.translateService.instant(
                  "TOOLS.PASSWORD_CHECK.BADGES.SUPER"
               ),
               variant: "success",
            };
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
