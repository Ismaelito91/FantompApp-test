import { Component, inject, OnInit, HostListener } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageService } from "../../service/language.service";
import { Router, RouterModule } from "@angular/router";
import { DeviceService } from "../../service/device.service";
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

   deviceMenuOpen = false;
   languageMenuOpen = false;

   ngOnInit(): void {}

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
      }
   }

   toggleLanguageMenu() {
      this.languageMenuOpen = !this.languageMenuOpen;
      if (this.languageMenuOpen) {
         this.deviceMenuOpen = false;
      }
   }

   closeAllMenus() {
      this.deviceMenuOpen = false;
      this.languageMenuOpen = false;
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
