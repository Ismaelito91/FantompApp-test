import { Injectable } from "@angular/core";

@Injectable({
   providedIn: "root",
})
export class IconGeneratorService {
   private readonly STORAGE_KEY = "app-icon-preference";
   private manifestLink: HTMLLinkElement | null = null;
   private faviconLink: HTMLLinkElement | null = null;

   constructor() {
      this.setupManifestLink();
      this.setupFaviconLink();
      this.initializeIcon();
   }

   /**
    * Configure le lien vers le manifest
    */
   private setupManifestLink(): void {
      this.manifestLink = document.querySelector('link[rel="manifest"]');
      if (!this.manifestLink) {
         this.manifestLink = document.createElement("link");
         this.manifestLink.rel = "manifest";
         document.head.appendChild(this.manifestLink);
      }
   }

   private setupFaviconLink(): void {
      this.faviconLink = document.querySelector('link[rel="icon"]');
      if (!this.faviconLink) {
         this.faviconLink = document.createElement("link");
         this.faviconLink.rel = "icon";
         this.faviconLink.type = "image/png";
         document.head.appendChild(this.faviconLink);
      }
   }

   /**
    * Initialise l'icône au démarrage de l'application
    */
   private async initializeIcon(): Promise<void> {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const iconIndex = saved ? saved : "1"; // défaut: 1
      await this.updateIcon(iconIndex, false);
   }

   // plus de génération à la volée: on utilise les PNG statiques du dossier public/icons

   /**
    * Met à jour l'icône du widget PWA
    */
   async updateIcon(iconIndex: string, notifyUser: boolean = true): Promise<void> {
      try {
         const manifestHref = `/manifest-icon${iconIndex}.webmanifest`;
         const faviconHref = `/icons/Icone-FantomApp-${iconIndex}-192x192.png`;

         // Sauvegarder la préférence
         localStorage.setItem(this.STORAGE_KEY, iconIndex);

         // Mettre à jour le favicon
         this.updateFavicon(faviconHref);

         // Mettre à jour le manifest
         if (this.manifestLink) {
            this.manifestLink.href = manifestHref + `?v=${Date.now()}`;
         }

         // Forcer la mise à jour du Service Worker (vider caches pour rafraîchir manifest)
         await this.updateServiceWorker();

         if (notifyUser) {
            console.log("Icône du widget mise à jour avec succès");
         }
      } catch (error) {
         console.error("Erreur lors de la mise à jour de l'icône:", error);
         throw error;
      }
   }

   /**
    * Force la mise à jour du Service Worker
    */
   private async updateServiceWorker(): Promise<void> {
      if ("serviceWorker" in navigator) {
         try {
            const registrations =
               await navigator.serviceWorker.getRegistrations();

            for (const registration of registrations) {
               // Mettre à jour le service worker
               await registration.update();

               // Vider le cache
               if (registration.active) {
                  const cacheNames = await caches.keys();
                  await Promise.all(
                     cacheNames.map((cacheName) => caches.delete(cacheName))
                  );
               }
            }
         } catch (error) {
            console.error(
               "Erreur lors de la mise à jour du Service Worker:",
               error
            );
         }
      }
   }

   /**
    * Sauvegarde l'icône dans IndexedDB
    */
   // suppression de la persistance IndexedDB inutile pour ce cas

   /**
    * Met à jour le manifest PWA dynamiquement
    */
   // plus de génération de manifest dynamique, on pointe vers des manifests statiques

   /**
    * Met à jour le favicon dynamiquement
    */
   updateFavicon(href: string): void {
      if (!this.faviconLink) {
         this.setupFaviconLink();
      }
      if (this.faviconLink) {
         this.faviconLink.href = href + `?v=${Date.now()}`;
      }
   }

   /**
    * Retourne le chemin de l'icône selon le type
    */
   // plus de mapping SVG; on utilise les PNG du public/icons
}
