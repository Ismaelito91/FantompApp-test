import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ZoomLayoutService {
   /** Incrémenté au resize pour réévaluer les bindings template. */
   readonly zoomVersion = signal(0);

   private readonly baseDevicePixelRatio =
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

   constructor() {
      if (typeof window === "undefined") return;

      const bump = () => this.zoomVersion.update((value) => value + 1);
      window.addEventListener("resize", bump);
      window.visualViewport?.addEventListener("resize", bump);
   }

   isZoomAtLeast(threshold = 1.7): boolean {
      this.zoomVersion();
      if (typeof window === "undefined") return false;

      const viewportScale = window.visualViewport?.scale ?? 1;
      const windowZoom =
         window.outerWidth && window.innerWidth
            ? window.outerWidth / window.innerWidth
            : 1;
      const dprZoom = (window.devicePixelRatio || 1) / this.baseDevicePixelRatio;
      const bodyZoom = Number.parseFloat(
         window.getComputedStyle(document.body).zoom,
      );
      const scale = Math.max(
         viewportScale,
         windowZoom,
         dprZoom,
         Number.isNaN(bodyZoom) ? 1 : bodyZoom,
         this.measureDomZoom(),
      );

      return scale >= threshold;
   }

   private measureDomZoom(): number {
      this.zoomVersion();
      if (typeof document === "undefined") return 1;

      const probe = document.createElement("div");
      probe.style.cssText =
         "width:100px;height:100px;position:absolute;visibility:hidden;pointer-events:none;";
      document.body.appendChild(probe);
      const zoom = probe.getBoundingClientRect().width / 100;
      document.body.removeChild(probe);

      return zoom;
   }
}
