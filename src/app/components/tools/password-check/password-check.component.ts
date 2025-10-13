import { CommonModule, Location } from "@angular/common";
import {
   Component,
   OnDestroy,
   OnInit,
   AfterViewInit,
   ElementRef,
   ViewChild,
   HostListener,
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
   public readonly crackingTimeData: PasswordCrackingData[] = [
      {
         characters: 4,
         numbersOnly: { value: "", unit: "INSTANT", color: "red" },
         lowercaseOnly: { value: "", unit: "INSTANT", color: "red" },
         mixedCase: { value: "", unit: "INSTANT", color: "red" },
         numbersAndLetters: { value: "", unit: "INSTANT", color: "red" },
         allCharacters: { value: "", unit: "INSTANT", color: "red" },
      },
      {
         characters: 5,
         numbersOnly: { value: "", unit: "INSTANT", color: "red" },
         lowercaseOnly: { value: "", unit: "INSTANT", color: "red" },
         mixedCase: { value: "57", unit: "MINUTES", color: "red" },
         numbersAndLetters: { value: "2", unit: "HOURS", color: "red" },
         allCharacters: { value: "4", unit: "HOURS", color: "red" },
      },
      {
         characters: 6,
         numbersOnly: { value: "", unit: "INSTANT", color: "red" },
         lowercaseOnly: { value: "46", unit: "MINUTES", color: "red" },
         mixedCase: { value: "2", unit: "DAYS", color: "red" },
         numbersAndLetters: { value: "6", unit: "DAYS", color: "red" },
         allCharacters: { value: "2", unit: "WEEKS", color: "red" },
      },
      {
         characters: 7,
         numbersOnly: { value: "", unit: "INSTANT", color: "red" },
         lowercaseOnly: { value: "20", unit: "HOURS", color: "red" },
         mixedCase: { value: "4", unit: "MONTHS", color: "orange" },
         numbersAndLetters: { value: "1", unit: "YEAR", color: "orange" },
         allCharacters: { value: "2", unit: "YEARS", color: "orange" },
      },
      {
         characters: 8,
         numbersOnly: { value: "", unit: "INSTANT", color: "red" },
         lowercaseOnly: { value: "3", unit: "WEEKS", color: "red" },
         mixedCase: { value: "15", unit: "YEARS", color: "orange" },
         numbersAndLetters: { value: "62", unit: "YEARS", color: "orange" },
         allCharacters: { value: "164", unit: "YEARS", color: "orange" },
      },
      {
         characters: 9,
         numbersOnly: { value: "2", unit: "HOURS", color: "red" },
         lowercaseOnly: { value: "2", unit: "YEARS", color: "orange" },
         mixedCase: { value: "791", unit: "YEARS", color: "orange" },
         numbersAndLetters: { value: "3000", unit: "YEARS", color: "orange" },
         allCharacters: { value: "11000", unit: "YEARS", color: "orange" },
      },
      {
         characters: 10,
         numbersOnly: { value: "1", unit: "DAYS", color: "red" },
         lowercaseOnly: { value: "40", unit: "YEARS", color: "orange" },
         mixedCase: { value: "41000", unit: "THOUSAND_YEARS", color: "orange" },
         numbersAndLetters: {
            value: "238",
            unit: "THOUSAND_YEARS",
            color: "orange",
         },
         allCharacters: {
            value: "803",
            unit: "THOUSAND_YEARS",
            color: "orange",
         },
      },
      {
         characters: 11,
         numbersOnly: { value: "1", unit: "WEEKS", color: "red" },
         lowercaseOnly: { value: "1000", unit: "YEARS", color: "orange" },
         mixedCase: { value: "2", unit: "MILLION_YEARS", color: "orange" },
         numbersAndLetters: {
            value: "14",
            unit: "MILLION_YEARS",
            color: "orange",
         },
         allCharacters: { value: "56", unit: "MILLION_YEARS", color: "orange" },
      },
      {
         characters: 12,
         numbersOnly: { value: "3", unit: "MONTHS", color: "orange" },
         lowercaseOnly: {
            value: "27",
            unit: "THOUSAND_YEARS",
            color: "orange",
         },
         mixedCase: { value: "111", unit: "MILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "917",
            unit: "MILLION_YEARS",
            color: "blue",
         },
         allCharacters: { value: "3", unit: "BILLION_YEARS", color: "green" },
      },
      {
         characters: 13,
         numbersOnly: { value: "3", unit: "YEARS", color: "orange" },
         lowercaseOnly: {
            value: "705",
            unit: "THOUSAND_YEARS",
            color: "orange",
         },
         mixedCase: { value: "5", unit: "BILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "56",
            unit: "BILLION_YEARS",
            color: "blue",
         },
         allCharacters: { value: "275", unit: "BILLION_YEARS", color: "green" },
      },
      {
         characters: 14,
         numbersOnly: { value: "28", unit: "YEARS", color: "orange" },
         lowercaseOnly: { value: "18", unit: "MILLION_YEARS", color: "orange" },
         mixedCase: { value: "300", unit: "BILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "3",
            unit: "TRILLION_YEARS",
            color: "blue",
         },
         allCharacters: { value: "19", unit: "TRILLION_YEARS", color: "green" },
      },
      {
         characters: 15,
         numbersOnly: { value: "284", unit: "YEARS", color: "orange" },
         lowercaseOnly: {
            value: "477",
            unit: "MILLION_YEARS",
            color: "orange",
         },
         mixedCase: { value: "15", unit: "TRILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "218",
            unit: "TRILLION_YEARS",
            color: "blue",
         },
         allCharacters: {
            value: "1",
            unit: "QUADRILLION_YEARS",
            color: "green",
         },
      },
      {
         characters: 16,
         numbersOnly: { value: "2", unit: "THOUSAND_YEARS", color: "orange" },
         lowercaseOnly: { value: "12", unit: "BILLION_YEARS", color: "orange" },
         mixedCase: { value: "812", unit: "TRILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "13",
            unit: "TRILLION_YEARS",
            color: "blue",
         },
         allCharacters: { value: "94", unit: "", color: "green" },
      },
      {
         characters: 17,
         numbersOnly: { value: "28", unit: "THOUSAND_YEARS", color: "orange" },
         lowercaseOnly: {
            value: "322",
            unit: "BILLION_YEARS",
            color: "orange",
         },
         mixedCase: { value: "42", unit: "QUADRILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "840",
            unit: "QUADRILLION_YEARS",
            color: "blue",
         },
         allCharacters: {
            value: "6",
            unit: "QUINTILLION_YEARS",
            color: "green",
         },
      },
      {
         characters: 18,
         numbersOnly: { value: "284", unit: "THOUSAND_YEARS", color: "orange" },
         lowercaseOnly: { value: "8", unit: "TRILLION_YEARS", color: "orange" },
         mixedCase: { value: "2", unit: "QUADRILLION_YEARS", color: "blue" },
         numbersAndLetters: {
            value: "52",
            unit: "QUADRILLION_YEARS",
            color: "blue",
         },
         allCharacters: {
            value: "463",
            unit: "QUINTILLION_YEARS",
            color: "green",
         },
      },
   ];

   public translateTime(
      value: string,
      unit: string,
      translateService: any
   ): string {
      if (unit === "INSTANT") {
         const translated = translateService.instant(
            "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
         );
         return translated === "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
            ? "Instantané"
            : translated;
      }

      const translatedUnit = translateService.instant(
         `TOOLS.PASSWORD_CHECK.TIME_UNITS.${unit}`
      );
      if (translatedUnit === `TOOLS.PASSWORD_CHECK.TIME_UNITS.${unit}`) {
         const defaultUnits: { [key: string]: string } = {
            MINUTES: "minutes",
            HOURS: "heures",
            DAY: "jour",
            DAYS: "jours",
            WEEK: "semaine",
            WEEKS: "semaines",
            MONTHS: "mois",
            YEARS: "ans",
            THOUSAND_YEARS: "milliers d'années",
            MILLION_YEARS: "millions d'années",
            BILLION_YEARS: "milliards d'années",
            TRILLION_YEARS: "billions d'années",
            QUADRILLION_YEARS: "trillions d'années",
            QUINTILLION_YEARS: "quadrillions d'années",
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
            color: "red",
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

      type = "lowercaseOnly";

      if (hasNumbers && !hasLowercase && !hasUppercase && !hasSpecialChars) {
         type = "numbersOnly";
      }

      if (
         (hasLowercase && !hasUppercase && !hasNumbers && !hasSpecialChars) ||
         (!hasLowercase && hasUppercase && !hasNumbers && hasSpecialChars) ||
         (!hasLowercase && !hasUppercase && !hasNumbers && hasSpecialChars)
      ) {
         type = "lowercaseOnly";
      }

      if (
         (hasLowercase && hasUppercase && !hasNumbers && !hasSpecialChars) ||
         (!hasLowercase && hasUppercase && !hasNumbers && hasSpecialChars) ||
         (!hasLowercase && hasUppercase && hasNumbers && !hasSpecialChars) ||
         (hasLowercase && !hasUppercase && !hasNumbers && hasSpecialChars) ||
         (hasLowercase && !hasUppercase && hasNumbers && !hasSpecialChars) ||
         (!hasLowercase && !hasUppercase && hasNumbers && hasSpecialChars)
      ) {
         type = "mixedCase";
      }

      if (
         (hasNumbers && hasLowercase && hasUppercase && !hasSpecialChars) ||
         (hasNumbers && !hasLowercase && hasUppercase && hasSpecialChars) ||
         (hasNumbers && hasLowercase && !hasUppercase && hasSpecialChars) ||
         (!hasNumbers && hasLowercase && hasUppercase && hasSpecialChars)
      ) {
         type = "numbersAndLetters";
      }

      if (hasNumbers && hasLowercase && hasUppercase && hasSpecialChars) {
         type = "allCharacters";
      }
      return this.getEvaluationResult(length, type);
   }
}

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
   typewriterInterval: any;

   // Propriétés pour affichage séparé
   numberPart: string = "";
   unitPart: string = "";
   shouldSplit: boolean = false;
   displayedNumberPart: string = "";
   displayedUnitPart: string = "";

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
         this.showInfoModal = true;
         localStorage.setItem("password-check-onboarding-seen", "true");
         this.hasSeenOnboarding = true;

         // Annoncer l'ouverture du tutoriel
         setTimeout(() => {
            this.announceToScreenReader(
               this.translateService.instant(
                  "TOOLS.PASSWORD_CHECK.ACCESSIBILITY.TUTORIAL_OPENED"
               )
            );
         }, 500);
      }
   }

   ngAfterViewInit() {
      // Attendre un peu et initialiser les critères quand tout est chargé
      setTimeout(() => {
         this.initializeCriteria();
      }, 100);
   }

   private activateInput() {
      // Activer l'input automatiquement
      this.isInputFocused = true;
      // Focus sur l'input après un petit délai pour s'assurer que l'élément est rendu
      setTimeout(() => {
         if (this.passwordInput) {
            this.passwordInput.nativeElement.focus();
         }
      }, 200);
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

      // Annoncer le changement d'état
      const message = this.showPassword
         ? this.translateService.instant(
              "TOOLS.PASSWORD_CHECK.ACCESSIBILITY.PASSWORD_SHOWN"
           )
         : this.translateService.instant(
              "TOOLS.PASSWORD_CHECK.ACCESSIBILITY.PASSWORD_HIDDEN"
           );
      this.announceToScreenReader(message);
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

            // Annoncer la copie réussie
            this.announceToScreenReader(
               this.translateService.instant(
                  "TOOLS.PASSWORD_CHECK.ACCESSIBILITY.PASSWORD_COPIED"
               )
            );

            // Masquer la notification après 2 secondes
            setTimeout(() => {
               this.showCopyNotification = false;
            }, 2000);
         }
      } catch (err) {
         // Gestion silencieuse des erreurs de copie
         console.error("Erreur lors de la copie:", err);

         // Annoncer l'échec de la copie
         this.announceToScreenReader(
            this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.ACCESSIBILITY.COPY_FAILED"
            )
         );
      }
   }

   toggleInfoModal() {
      this.showInfoModal = !this.showInfoModal;

      if (!this.showInfoModal) {
         // Remettre le focus sur l'élément principal après fermeture
         setTimeout(() => {
            if (this.passwordInput) {
               this.passwordInput.nativeElement.focus();
            }
         }, 100);
      }
   }

   togglePasswordInfoModal() {
      this.showPasswordInfoModal = !this.showPasswordInfoModal;

      if (!this.showPasswordInfoModal) {
         // Remettre le focus sur l'élément principal après fermeture
         setTimeout(() => {
            if (this.passwordInput) {
               this.passwordInput.nativeElement.focus();
            }
         }, 100);
      }
   }

   // Gestion de la navigation au clavier pour l'accessibilité
   @HostListener("keydown", ["$event"])
   onKeyDown(event: KeyboardEvent) {
      // Fermer les modales avec Échap
      if (event.key === "Escape") {
         if (this.showInfoModal) {
            this.toggleInfoModal();
            event.preventDefault();
         } else if (this.showPasswordInfoModal) {
            this.togglePasswordInfoModal();
            event.preventDefault();
         } else if (this.isInputFocused) {
            this.cancelInputFocus();
            event.preventDefault();
         }
      }

      // Activer le bouton principal avec Entrée ou Espace
      if (
         (event.key === "Enter" || event.key === " ") &&
         event.target === document.activeElement
      ) {
         const target = event.target as HTMLElement;
         if (target.classList.contains("password-info-button")) {
            this.handleButtonClick();
            event.preventDefault();
         }
      }
   }

   // Annonce vocale pour les changements d'état
   private announceToScreenReader(message: string) {
      // Créer un élément temporaire pour les annonces
      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.style.position = "absolute";
      announcement.style.left = "-10000px";
      announcement.style.width = "1px";
      announcement.style.height = "1px";
      announcement.style.overflow = "hidden";

      document.body.appendChild(announcement);

      // Ajouter le message
      setTimeout(() => {
         announcement.textContent = message;
      }, 100);

      // Nettoyer après annonce
      setTimeout(() => {
         document.body.removeChild(announcement);
      }, 3000);
   }

   // Gestion du focus pour l'animation
   onInputFocus() {
      // Si on affiche les résultats, reproduire le comportement du bouton "Renforcer mon mdp"
      if (this.showPasswordResults) {
         this.showPasswordResults = false;
         this.isInputFocused = true;
         // Focus maintenu automatiquement car l'utilisateur vient de cliquer sur l'input
         return;
      }

      // Comportement normal quand pas de résultats affichés
      this.isInputFocused = true;
   }

   onInputBlur() {
      if (this.password.length === 0) {
         this.isInputFocused = false;
         this.showPasswordResults = false;
      }
   }

   cancelInputFocus() {
      // Si il y a du contenu dans l'input, le supprimer d'abord
      if (this.password.length > 0) {
         this.password = "";
         // Nettoyer aussi les données liées aux résultats
         this.showPasswordResults = false;
         this.message = "";
         this.displayedMessage = "";
         this.numberPart = "";
         this.unitPart = "";
         this.shouldSplit = false;
         this.displayedNumberPart = "";
         this.displayedUnitPart = "";
         if (this.typewriterInterval) {
            clearInterval(this.typewriterInterval);
         }
      }

      // Si pas de contenu, désactiver le focus comme avant
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
      this.numberPart = "";
      this.unitPart = "";
      this.shouldSplit = false;
      this.displayedNumberPart = "";
      this.displayedUnitPart = "";
      this.isInputFocused = false; // Remet l'input en état non-focus
      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }

      // retour en arrière
      history.back();
   }

   // Effet typewriter lettre par lettre
   startTypewriterEffect(text: string) {
      this.displayedMessage = "";

      // Séparer le texte en nombre et unité
      this.splitNumberAndUnit(text);

      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }

      if (this.shouldSplit) {
         // Animation pour affichage séparé
         this.startSplitTypewriter();
      } else {
         // Animation normale
         this.startNormalTypewriter();
      }
   }

   // Animation typewriter normale
   startNormalTypewriter() {
      // Pour l'affichage normal, on utilise le texte complet stocké dans numberPart
      const fullText = this.numberPart;
      let currentIndex = 0;
      this.typewriterInterval = setInterval(() => {
         if (currentIndex < fullText.length) {
            this.displayedMessage += fullText.charAt(currentIndex);
            currentIndex++;
         } else {
            clearInterval(this.typewriterInterval);
         }
      }, 50);
   }

   // Animation typewriter pour affichage séparé
   startSplitTypewriter() {
      this.displayedNumberPart = "";
      this.displayedUnitPart = "";

      let numberIndex = 0;
      let unitIndex = 0;
      let isAnimatingNumber = true;

      this.typewriterInterval = setInterval(() => {
         if (isAnimatingNumber && numberIndex < this.numberPart.length) {
            // Animer le nombre d'abord
            this.displayedNumberPart += this.numberPart.charAt(numberIndex);
            numberIndex++;
         } else if (isAnimatingNumber) {
            // Passer à l'animation de l'unité
            isAnimatingNumber = false;
         } else if (unitIndex < this.unitPart.length) {
            // Animer l'unité
            this.displayedUnitPart += this.unitPart.charAt(unitIndex);
            unitIndex++;
         } else {
            // Arrêter l'animation
            clearInterval(this.typewriterInterval);
         }
      }, 50);
   }

   // Sépare le texte en nombre et unité
   splitNumberAndUnit(text: string) {
      // Regex pour détecter un nombre au début + unité après
      const match = text.match(/^(\d+(?:[.,]\d+)?)\s*(.+)$/);

      if (match) {
         this.numberPart = match[1]; // Le nombre
         this.unitPart = match[2]; // L'unité
         this.shouldSplit = true;
      } else {
         this.numberPart = text;
         this.unitPart = "";
         this.shouldSplit = false;
      }
   }

   handleButtonClick() {
      this.isInputFocused = false;
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
         const translatedTime = passwordCalculator.translateTime(
            evaluation.timeValue,
            evaluation.timeUnit,
            this.translateService
         );

         this.message = translatedTime;

         // Annoncer les résultats aux lecteurs d'écran
         const validCriteria = this.criteria.filter((c) => c.valid).length;
         const resultMessage = this.translateService.instant(
            "TOOLS.PASSWORD_CHECK.ACCESSIBILITY.RESULTS_ANNOUNCED",
            {
               time: translatedTime,
               validCriteria: validCriteria,
               totalCriteria: this.criteria.length,
            }
         );

         setTimeout(() => {
            this.announceToScreenReader(resultMessage);
            this.startTypewriterEffect(translatedTime);
         }, 300);

         // ...existing level calculation code...
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
            case "red":
               baseLevel = "immediate";
               break;
            case "orange":
               baseLevel = "rapid";
               break;
            case "blue":
               baseLevel = "correct";
               break;
            case "green":
               baseLevel = "super";
               break;
            default:
               baseLevel = "correct";
         }

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
