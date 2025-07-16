import { Injectable, signal } from "@angular/core";

@Injectable({
   providedIn: "root",
})
export class OnboardingService {
   private readonly ONBOARDING_KEY = "fantome_app_onboarding_completed";

   // Signal pour gérer l'état d'affichage de l'onboarding
   private _isOnboardingVisible = signal<boolean>(false);

   // Signal pour gérer l'état actif de l'icône problème
   private _isProblemIconActive = signal<boolean>(false);

   // Signal pour gérer l'état actif de l'icône outils
   private _isToolsIconActive = signal<boolean>(false);

   // Signal pour gérer l'état actif de l'icône paramètres
   private _isSettingsIconActive = signal<boolean>(false);

   // Signal pour gérer l'état actif de l'icône "Me sécuriser"
   private _isSecureMyselfIconActive = signal<boolean>(false);

   constructor() {
      // Vérifie si c'est la première visite au démarrage
      this.checkFirstVisit();
   }

   /**
    * Signal readonly pour l'état de visibilité de l'onboarding
    */
   get isOnboardingVisible() {
      return this._isOnboardingVisible.asReadonly();
   }

   /**
    * Signal readonly pour l'état actif de l'icône problème
    */
   get isProblemIconActive() {
      return this._isProblemIconActive.asReadonly();
   }

   /**
    * Signal readonly pour l'état actif de l'icône outils
    */
   get isToolsIconActive() {
      return this._isToolsIconActive.asReadonly();
   }

   /**
    * Signal readonly pour l'état actif de l'icône paramètres
    */
   get isSettingsIconActive() {
      return this._isSettingsIconActive.asReadonly();
   }

   /**
    * Signal readonly pour l'état actif de l'icône "Me sécuriser"
    */
   get isSecureMyselfIconActive() {
      return this._isSecureMyselfIconActive.asReadonly();
   }

   /**
    * Vérifie si c'est la première visite de l'utilisateur
    */
   private checkFirstVisit(): void {
      const hasCompletedOnboarding = localStorage.getItem(this.ONBOARDING_KEY);

      if (!hasCompletedOnboarding) {
         // C'est la première visite, afficher l'onboarding
         this._isOnboardingVisible.set(true);
      }
   }

   /**
    * Affiche l'onboarding manuellement (quand l'utilisateur clique sur "C'est quoi cette app ?")
    */
   showOnboarding(): void {
      this._isOnboardingVisible.set(true);
   }

   /**
    * Cache l'onboarding et marque comme terminé
    */
   completeOnboarding(): void {
      this._isOnboardingVisible.set(false);
      localStorage.setItem(this.ONBOARDING_KEY, "true");
   }

   /**
    * Cache l'onboarding sans marquer comme terminé (pour permettre de le revoir)
    */
   hideOnboarding(): void {
      this._isOnboardingVisible.set(false);
   }

   /**
    * Vérifie si l'utilisateur a déjà terminé l'onboarding
    */
   hasCompletedOnboarding(): boolean {
      return localStorage.getItem(this.ONBOARDING_KEY) === "true";
   }

   /**
    * Remet à zéro l'état de l'onboarding (pour les tests ou réinitialisation)
    */
   resetOnboarding(): void {
      localStorage.removeItem(this.ONBOARDING_KEY);
      this._isOnboardingVisible.set(false);
   }

   /**
    * Active l'icône problème (pour l'étape 2 de l'onboarding)
    */
   activateProblemIcon(): void {
      this._isProblemIconActive.set(true);
   }

   /**
    * Désactive l'icône problème
    */
   deactivateProblemIcon(): void {
      this._isProblemIconActive.set(false);
   }

   /**
    * Active l'icône outils (pour l'étape 3 de l'onboarding)
    */
   activateToolsIcon(): void {
      this._isToolsIconActive.set(true);
   }

   /**
    * Désactive l'icône outils
    */
   deactivateToolsIcon(): void {
      this._isToolsIconActive.set(false);
   }

   /**
    * Active l'icône paramètres (pour l'étape 4 de l'onboarding)
    */
   activateSettingsIcon(): void {
      this._isSettingsIconActive.set(true);
   }

   /**
    * Désactive l'icône paramètres
    */
   deactivateSettingsIcon(): void {
      this._isSettingsIconActive.set(false);
   }

   /**
    * Active l'icône "Me sécuriser" (pour l'étape 4 de l'onboarding)
    */
   activateSecureMyselfIcon(): void {
      this._isSecureMyselfIconActive.set(true);
   }

   /**
    * Désactive l'icône "Me sécuriser"
    */
   deactivateSecureMyselfIcon(): void {
      this._isSecureMyselfIconActive.set(false);
   }
}
