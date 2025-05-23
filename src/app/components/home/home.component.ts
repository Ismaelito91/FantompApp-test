import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import packageInfo from "../../../../package.json";
import { SettingService } from "../../service/setting.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
   selector: "app-home",
   standalone: true,
   imports: [TranslateModule, MatButtonModule],
   templateUrl: "./home.component.html",
})
export class HomeComponent {
   private translateService = inject(TranslateService);
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
