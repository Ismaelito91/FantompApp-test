import { Component, inject, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
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
      MatMenuModule,
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

   ngOnInit(): void {}

   isVisible(): boolean {
      return this.router.url.includes("/secure-myself");
   }

   selectedDevice: string | null = sessionStorage.getItem("overrideDevice");

   setDevice(device: Device) {
      this.selectedDevice = device;
      this.deviceService.setOverride(device);
   }

   // Fournit l'URL du drapeau de la langue courante
   get currentFlagUrl(): string {
      const current = this._languageService.supportedLanguages.find(
         (l) => l.code === this._languageService.language()
      );
      return current?.flagUrl || "";
   }

   // Fournit la clé de traduction pour l'alt du drapeau actuel
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
