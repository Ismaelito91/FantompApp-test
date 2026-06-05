import { CommonModule, Location } from "@angular/common";
import { A11yModule } from "@angular/cdk/a11y";
import {
   AfterViewInit,
   Component,
   ElementRef,
   HostListener,
   inject,
   OnDestroy,
   OnInit,
   ViewChild,

} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { Router } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { PasswordSecurityService } from "../../../service/password-security.service";
import { BadgeComponent } from "../../design-system/badge/badge.component";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonCloseComponent } from "../../design-system/button-close/button-close.component";
import { ButtonComponent } from "../../design-system/button/button.component";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { UtilsService } from "../../../service/utils.service";

@Component({
   selector: "app-password-check",
   imports: [
      ButtonBackComponent,
      ButtonCloseComponent,
      ButtonComponent,
      FormsModule,
      CommonModule,
      A11yModule,
      BadgeComponent,
      TranslateModule,
      MatCheckboxModule,
      MatIconModule,
      MatTooltipModule,
      SafeHtmlPipe,
   ],
   templateUrl: "./password-check.component.html",
   styleUrl: "./password-check.component.scss",
})
export class PasswordCheckComponent
   implements OnDestroy, OnInit, AfterViewInit
{
   private readonly utilsService = inject(UtilsService);

   @ViewChild("passwordInput", { static: false })
   passwordInput!: ElementRef<HTMLInputElement>;

   @ViewChild("closeButton", { read: ElementRef })
   closeButtonRef!: ElementRef<HTMLButtonElement>;

   @ViewChild("backButton", { read: ElementRef })
   backButtonRef!: ElementRef<HTMLButtonElement>;

   @ViewChild("closePasswordInfoModalButton", { read: ElementRef })
   closePasswordInfoModalButtonRef!: ElementRef<HTMLButtonElement>;

   @ViewChild("popover", { static: false })
   popoverRef!: PopoverComponent;

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

   // Propriété pour le checkbox des mots courants
   containsCommonWords: boolean = false;

   // Propriétés pour l'effet typewriter
   displayedMessage: string = "";
   typewriterInterval: any;

   // Propriétés pour affichage séparé
   numberPart: string = "";
   unitPart: string = "";
   shouldSplit: boolean = false;
   displayedNumberPart: string = "";
   displayedUnitPart: string = "";
   showForceBruteModal = false;

   constructor(
      private router: Router,
      private location: Location,
      private translateService: TranslateService,
      private hostEl: ElementRef,
      private passwordSecurityService: PasswordSecurityService
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
         this.utilsService.setBackgroundInert(this.showInfoModal);
      }

      this.containsCommonWords = false;
      if (this.criteria && this.criteria.length >= 6) {
         this.criteria[5].valid = true;
      }
   }

   ngAfterViewInit() {
      // Attendre un peu et initialiser les critères quand tout est chargé
      setTimeout(() => {
         this.initializeCriteria();
      }, 100);

      // Si le modal d'onboarding est ouvert, mettre le focus dans le modal
      if (this.showInfoModal) {
         this.focusInfoModalCloseButton();
      }
   }


   private activateDefaultButton() {
      // Focus sur le premier boutton du formulaire (pas l'input pour pas déclencher l'animation)
      setTimeout(() => {
         if (this.backButtonRef) {
            this.backButtonRef.nativeElement.querySelector("button")?.focus();
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
         {
            name: this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.CRITERIA.NO_EASY_CLUES"
            ),
            valid: true, // Initialisé à true car par défaut on n'a pas d'indices faciles
         },
      ];
   }

   // Suivi de chaque critère pour affichage des icônes
   criteria: { name: string; valid: boolean }[] = [];

   toggleShowPassword() {
      this.showPassword = !this.showPassword;
   }

   // Méthode pour s'assurer que le critère est toujours à jour
   updateCommonWordsCriteria() {
      if (this.criteria && this.criteria.length >= 6) {
         this.criteria[5].valid = !this.containsCommonWords;
      }
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
      this.utilsService.setBackgroundInert(this.showInfoModal);
      if (this.showInfoModal) {
         this.focusInfoModalCloseButton();
      } else {
         localStorage.setItem("password-check-onboarding-seen", "true");
         // Remettre le focus sur l'élément principal après fermeture
         this.activateDefaultButton();
      }
   }

   togglePasswordInfoModal() {
      this.showPasswordInfoModal = !this.showPasswordInfoModal;
      this.utilsService.setBackgroundInert(this.showPasswordInfoModal);
      if (!this.showPasswordInfoModal) {
         // Remettre le focus sur l'élément principal après fermeture
         this.activateDefaultButton();
      } else {
         this.focusPasswordInfoModalCloseButton();
      }
   }

   private focusInfoModalCloseButton(attempt = 0): void {
      this.focusModalElement(
         ".info-modal",
         () =>
            (this.closeButtonRef?.nativeElement?.querySelector(
               "button"
            ) as HTMLButtonElement | null) ??
            (this.hostEl.nativeElement.querySelector(
               ".info-modal .btn"
            ) as HTMLButtonElement | null),
         () => this.focusInfoModalCloseButton(attempt + 1),
         attempt
      );
   }

   private focusPasswordInfoModalCloseButton(attempt = 0): void {
      this.focusModalElement(
         ".password-info-modal",
         () => this.closePasswordInfoModalButtonRef?.nativeElement ?? null,
         () => this.focusPasswordInfoModalCloseButton(attempt + 1),
         attempt
      );
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

   @HostListener("document:focusin", ["$event"])
   onDocumentFocusIn(event: FocusEvent): void {
      const target = event.target as Node | null;
      if (!target) return;

      if (this.showInfoModal) {
         const overlay = this.hostEl.nativeElement.querySelector(
            ".info-modal-overlay"
         );
         if (overlay && !overlay.contains(target)) {
            setTimeout(() => this.focusInfoModalCloseButton(), 0);
         }
         return;
      }

      if (this.showPasswordInfoModal) {
         const overlay = this.hostEl.nativeElement.querySelector(
            ".password-info-modal-overlay"
         );
         if (overlay && !overlay.contains(target)) {
            setTimeout(() => this.focusPasswordInfoModalCloseButton(), 0);
         }
      }
   }

   private focusModalElement(
      modalSelector: string,
      fallbackTarget: () => HTMLElement | null,
      retry: () => void,
      attempt: number
   ): void {
      const modal = this.hostEl.nativeElement.querySelector(modalSelector) as
         | HTMLElement
         | null;
      if (modal) {
         modal.setAttribute("tabindex", "-1");
         modal.focus({ preventScroll: true });
         return;
      }

      const fallback = fallbackTarget();
      if (fallback) {
         fallback.focus({ preventScroll: true });
         return;
      }

      if (attempt < 12) {
         setTimeout(retry, 100);
      }
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

      this.isInputFocused = true;
   }

   onInputBlur() {}

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

      // Réinitialiser la checkbox des mots courants
      this.containsCommonWords = false;
      if (this.criteria && this.criteria.length >= 6) {
         this.criteria[5].valid = true;
      }
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
      this.isInputFocused = false;
      this.containsCommonWords = false;
      if (this.criteria && this.criteria.length >= 6) {
         this.criteria[5].valid = true;
      }
      if (this.typewriterInterval) {
         clearInterval(this.typewriterInterval);
      }
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

      // Si il y a du texte dans l'input OU si la checkbox est cochée, tester le mot de passe
      if (this.password.length > 0 || this.containsCommonWords) {
         this.checkPassword();
         return;
      }

      // Si pas de texte et input pas focus, montrer l'info sur les bons mots de passe
      if (this.password.length === 0 && !this.isInputFocused) {
         // bloc de texte utilisé lors de la méthode onKeyDown,
         // pourra être retiré si on gère les bouton normalement
         this.handleButtonWhatIsGoodPasswordClick();
         return;
      }

      // Si pas de texte mais input focus, ne rien faire
      if (this.password.length === 0 && this.isInputFocused) {
         return;
      }
   }
   handleButtonWhatIsGoodPasswordClick() {
      this.togglePasswordInfoModal();
   }

   checkPassword() {
      this.showPasswordResults = true;
      this.focusPasswordResultsContainer();

      // Vérification des critères de base pour l'affichage des icônes
      this.criteria[0].valid = this.password.length >= 12;
      this.criteria[1].valid = /[A-Z]/.test(this.password);
      this.criteria[2].valid = /[a-z]/.test(this.password);
      this.criteria[3].valid = /[0-9]/.test(this.password);
      this.criteria[4].valid = /[^A-Za-z0-9]/.test(this.password);
      // S'assurer que le critère "mots courants" est à jour
      this.updateCommonWordsCriteria();

      // Gérer le cas où l'input est vide mais la checkbox est cochée
      if (this.password.length === 0 && this.containsCommonWords) {
         // Forcer le résultat le plus faible (instantané) pour un mot de passe vide avec mots courants
         this.message = this.translateService.instant(
            "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
         );
         this.passwordResultLevel = "immediate";
         this.isRapidCracking = true;

         // Démarrer l'effet typewriter pour "Instantané"
         setTimeout(() => {
            this.startTypewriterEffect(this.message);
         }, 300);

         return;
      }

      if (this.password.length > 0) {
         // PRIORITÉ ABSOLUE : Si le checkbox "mots courants" est coché, forcer le résultat à "instantané"
         if (this.containsCommonWords) {
            // Forcer le résultat le plus faible (instantané) - AUCUNE autre condition ne peut l'annuler
            this.message = this.translateService.instant(
               "TOOLS.PASSWORD_CHECK.TIME_UNITS.INSTANT"
            );
            this.passwordResultLevel = "immediate";
            this.isRapidCracking = true;

            // Démarrer l'effet typewriter pour "Instantané"
            setTimeout(() => {
               this.startTypewriterEffect(this.message);
            }, 300);

            // IMPORTANT : Sortir immédiatement de la fonction pour éviter toute autre évaluation
            return;
         }

         // Comportement normal SEULEMENT si le checkbox n'est pas coché
         const evaluation =
            this.passwordSecurityService.evaluatePasswordStrength(
               this.password
            );

         // Traduire le temps de craquage
         const translatedTime = this.passwordSecurityService.translateTime(
            evaluation.timeValue,
            evaluation.timeUnit
         );

         this.message = translatedTime;

         // Démarrer l'effet typewriter pour le message
         setTimeout(() => {
            this.startTypewriterEffect(translatedTime);
         }, 300);

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

   private focusPasswordResultsContainer() {
      if (!this.showPasswordResults) {
         return;
      }

      setTimeout(() => {
         document.getElementById("password-result-title")?.focus({ preventScroll: true });
      });
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
