import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import packageInfo from "../../../../package.json";
import { SettingService } from "../../service/setting.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ThemeService } from "../../service/theme.service";
import { computed } from "@angular/core";

@Component({
   selector: "app-home",
   standalone: true,

   imports: [
      CommonModule,
      TranslateModule,
      MatButtonModule,
      MatIconModule,
      RouterModule,
   ],
   templateUrl: "./home.component.html",
   styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
   private translateService = inject(TranslateService);
   private themeService = inject(ThemeService);
   _settingService = inject(SettingService);

   isDarkMode = computed(
      () => this.themeService.selectedTheme()?.name === "dark"
   );

   constructor() {
      // Vérifie que les icônes sont disponibles
      console.log("Home component initialized");
   }

   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return this._settingService.settings()?.version;
   }
}
