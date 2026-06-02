import { ChangeDetectorRef, Component, inject, OnInit, HostListener } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../service/language.service";
import { Router, RouterModule } from "@angular/router";
import { DeviceService } from "../../service/device.service";
import { ZoomLayoutService } from "../../service/zoom-layout.service";
import { Device } from "../../model/enum/device.enum";

@Component({
   selector: "app-header",
   standalone: true,
   imports: [
      MatIconModule,
      MatToolbarModule,
      MatButtonModule,
      TranslateModule,
      RouterModule,
      MatDividerModule,
   ],
   templateUrl: "./header.component.html",
   styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
   private deviceService = inject(DeviceService);
   protected _languageService = inject(LanguageService);
   private router = inject(Router);
   private cdr = inject(ChangeDetectorRef);
   private readonly zoomLayout = inject(ZoomLayoutService);

   deviceMenuOpen = false;
   languageMenuOpen = false;
   deviceMenuFixed = false;
   languageMenuFixed = false;

   ngOnInit(): void {}

   @HostListener("window:resize")
   onWindowResize() {
      if (this.deviceMenuOpen) this.applyZoomLayout("device");
      if (this.languageMenuOpen) this.applyZoomLayout("language");
   }

   @HostListener("document:click", ["$event"])
   onDocumentClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
         !target.closest(".mat-mdc-menu-panel") &&
         !target.closest(".lang-trigger")
      ) {
         this.closeAllMenus();
      }
   }

   @HostListener("document:keydown.escape")
   onEscapePress() {
      this.closeAllMenus();
   }

   isVisible(): boolean {
      return this.router.url.includes("/secure-myself");
   }

   selectedDevice: string | null = sessionStorage.getItem("overrideDevice");

   setDevice(device: Device) {
      this.selectedDevice = device;
      this.deviceService.setOverride(device);
      this.closeAllMenus();
   }

   toggleDeviceMenu() {
      this.deviceMenuOpen = !this.deviceMenuOpen;
      if (this.deviceMenuOpen) {
         this.languageMenuOpen = false;
         this.languageMenuFixed = false;
         this.applyZoomLayout("device");
      } else {
         this.deviceMenuFixed = false;
      }
   }

   toggleLanguageMenu() {
      this.languageMenuOpen = !this.languageMenuOpen;
      if (this.languageMenuOpen) {
         this.deviceMenuOpen = false;
         this.deviceMenuFixed = false;
         this.applyZoomLayout("language");
      } else {
         this.languageMenuFixed = false;
      }
   }

   closeAllMenus() {
      this.deviceMenuOpen = false;
      this.languageMenuOpen = false;
      this.deviceMenuFixed = false;
      this.languageMenuFixed = false;
   }

   private applyZoomLayout(type: "device" | "language"): void {
      const fixed = this.zoomLayout.isZoomAtLeast(1.5);
      if (type === "device") {
         this.deviceMenuFixed = fixed;
      } else {
         this.languageMenuFixed = fixed;
      }
      this.cdr.markForCheck();
   }

   get currentFlagUrl(): string {
      const current = this._languageService.supportedLanguages.find(
         (l) => l.code === this._languageService.language()
      );
      return current?.flagUrl || "";
   }

   get currentFlagAltKey(): string {
      const current = this._languageService.supportedLanguages.find(
         (l) => l.code === this._languageService.language()
      );
      return current?.flagAltKey || "ALT_TEXT.GENERAL.FLAG";
   }

   get currentLanguageName(): string {
      const current = this._languageService.supportedLanguages.find(
         (l) => l.code === this._languageService.language()
      );
      return current?.languageName || "";
   }

   get currentLanguageLang(): string {
      const current = this._languageService.supportedLanguages.find(
         (l) => l.code === this._languageService.language()
      );
      return current?.lang || "fr";
   }

   protected readonly Device = Device;
}
