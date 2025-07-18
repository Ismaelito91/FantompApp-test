import { Injectable, signal } from "@angular/core";

@Injectable({
   providedIn: "root",
})
export class GhostAnimationService {
    private _shouldPlayGhostAnimation = signal<boolean>(false);

   constructor() {}

   get shouldPlayGhostAnimation() {
      return this._shouldPlayGhostAnimation.asReadonly();
   }

   /**
    * Déclenche l'animation du fantôme
    */
   triggerGhostAnimation(): void {
      this._shouldPlayGhostAnimation.set(true);
   }

   /**
    * Arrête l'animation du fantôme
    */
   stopGhostAnimation(): void {
      this._shouldPlayGhostAnimation.set(false);
   }
} 