import { Injectable } from "@angular/core";

@Injectable({
   providedIn: "root",
})
export class IconGeneratorService {
   private readonly STORAGE_KEY = "app-icon-preference";
   private readonly WIDGET_ICON_SIZE = 192;
   private manifestLink: HTMLLinkElement | null = null;

   constructor() {
      this.initializeIcon();
      this.setupManifestLink();
   }

   /**
    * Configure le lien vers le manifest
    */
   private setupManifestLink(): void {
      // Supprimer l'ancien lien s'il existe
      this.manifestLink = document.querySelector('link[rel="manifest"]');
      if (this.manifestLink) {
         this.manifestLink.remove();
      }

      // Créer un nouveau lien
      this.manifestLink = document.createElement("link");
      this.manifestLink.rel = "manifest";
      this.manifestLink.href = "/manifest.webmanifest";
      document.head.appendChild(this.manifestLink);
   }

   /**
    * Initialise l'icône au démarrage de l'application
    */
   private async initializeIcon(): Promise<void> {
      const savedIcon = localStorage.getItem(this.STORAGE_KEY);
      if (savedIcon) {
         await this.updateIcon(savedIcon, false);
      }
   }

   /**
    * Génère l'icône PNG pour le widget PWA
    */
   async generateWidgetIcon(svgPath: string): Promise<Blob> {
      return new Promise((resolve, reject) => {
         const canvas = document.createElement("canvas");
         const ctx = canvas.getContext("2d");
         const img = new Image();

         canvas.width = this.WIDGET_ICON_SIZE;
         canvas.height = this.WIDGET_ICON_SIZE;

         img.onload = () => {
            if (ctx) {
               // Dessiner un fond blanc
               ctx.fillStyle = "#FFFFFF";
               ctx.fillRect(0, 0, this.WIDGET_ICON_SIZE, this.WIDGET_ICON_SIZE);

               // Dessiner l'image SVG
               ctx.drawImage(
                  img,
                  0,
                  0,
                  this.WIDGET_ICON_SIZE,
                  this.WIDGET_ICON_SIZE
               );

               // Convertir en blob PNG
               canvas.toBlob((blob) => {
                  if (blob) {
                     resolve(blob);
                  } else {
                     reject(new Error("Impossible de générer l'icône"));
                  }
               }, "image/png");
            }
         };

         img.onerror = () => reject(new Error("Impossible de charger le SVG"));
         img.src = svgPath;
      });
   }

   /**
    * Met à jour l'icône du widget PWA
    */
   async updateIcon(
      iconType: string,
      notifyUser: boolean = true
   ): Promise<void> {
      try {
         const iconPath = this.getIconPath(iconType);

         // Mettre à jour le favicon immédiatement
         this.updateFavicon(iconPath);

         // Sauvegarder la préférence
         localStorage.setItem(this.STORAGE_KEY, iconType);

         // Générer l'icône du widget
         const icon = await this.generateWidgetIcon(iconPath);

         // Sauvegarder dans IndexedDB
         await this.saveIconToIndexedDB(icon);

         // Mettre à jour le manifest dynamiquement
         await this.updateManifest(icon);

         // Forcer la mise à jour du Service Worker
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
   private async saveIconToIndexedDB(icon: Blob): Promise<void> {
      return new Promise((resolve, reject) => {
         const request = indexedDB.open("FantomAppIcons", 1);

         request.onerror = () =>
            reject(new Error("Erreur d'ouverture IndexedDB"));

         request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains("icons")) {
               db.createObjectStore("icons");
            }
         };

         request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction("icons", "readwrite");
            const store = transaction.objectStore("icons");

            // Sauvegarder l'icône
            store.put(icon, "widget-icon");

            transaction.oncomplete = () => {
               db.close();
               resolve();
            };

            transaction.onerror = () => {
               db.close();
               reject(new Error("Erreur de sauvegarde dans IndexedDB"));
            };
         };
      });
   }

   /**
    * Met à jour le manifest PWA dynamiquement
    */
   private async updateManifest(icon: Blob): Promise<void> {
      // Créer un URL pour le blob
      const iconUrl = URL.createObjectURL(icon);

      const manifest = {
         name: "FantomApp",
         short_name: "FantomApp",
         icons: [
            {
               src: iconUrl,
               sizes: "192x192",
               type: "image/png",
               purpose: "maskable any",
            },
         ],
      };

      // Créer un blob pour le manifest
      const manifestBlob = new Blob([JSON.stringify(manifest)], {
         type: "application/json",
      });
      const manifestUrl = URL.createObjectURL(manifestBlob);

      // Mettre à jour le lien du manifest
      if (this.manifestLink) {
         this.manifestLink.href = manifestUrl;
      }

      // Sauvegarder dans IndexedDB
      return new Promise((resolve, reject) => {
         const request = indexedDB.open("FantomAppIcons", 1);

         request.onerror = () =>
            reject(new Error("Erreur d'ouverture IndexedDB"));

         request.onsuccess = (event: Event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            const transaction = db.transaction("icons", "readwrite");
            const store = transaction.objectStore("icons");

            store.put(JSON.stringify(manifest), "manifest");

            transaction.oncomplete = () => {
               db.close();
               resolve();
            };

            transaction.onerror = () => {
               db.close();
               reject(new Error("Erreur de sauvegarde du manifest"));
            };
         };
      });
   }

   /**
    * Met à jour le favicon dynamiquement
    */
   updateFavicon(svgPath: string): void {
      // Supprimer l'ancien favicon
      const existingFavicon = document.querySelector('link[rel="icon"]');
      if (existingFavicon) {
         existingFavicon.remove();
      }

      // Créer le nouveau favicon
      const newFavicon = document.createElement("link");
      newFavicon.rel = "icon";
      newFavicon.href = svgPath;
      document.head.appendChild(newFavicon);
   }

   /**
    * Retourne le chemin de l'icône selon le type
    */
   private getIconPath(iconType: string): string {
      const iconPaths: { [key: string]: string } = {
         cnil: "assets/images/logo-CNIL-EU.svg",
         fantome: "assets/images/famtome-app.svg",
         rectangle: "assets/images/Rectangle 521.svg",
      };

      return iconPaths[iconType] || iconPaths["cnil"];
   }
}
