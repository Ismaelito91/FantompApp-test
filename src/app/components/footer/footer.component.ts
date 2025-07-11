import { Component, effect, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import packageInfo from "../../../../package.json";
import { SettingService } from "../../service/setting.service";
import { ThemeService } from "../../service/theme.service";

@Component({
   selector: "app-footer",
   standalone: true,
   imports: [
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      TranslateModule,
      RouterLink,
      RouterLinkActive,
   ],
   templateUrl: "./footer.component.html",
   styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
   private _settingService = inject(SettingService);
   private themeService = inject(ThemeService);

   toolsInactiveIcon: string = "tools-clear-inactive";
   toolsActiveIcon: string = "tools-clear-active";

   constructor() {
      effect(() => {
         const isDark = this.themeService.isDark$();
         if (isDark) {
            this.toolsInactiveIcon = "tools-dark-inactive";
            this.toolsActiveIcon = "tools-dark-active";
         } else {
            this.toolsInactiveIcon = "tools-clear-inactive";
            this.toolsActiveIcon = "tools-clear-active";
         }
      });
   }

   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return this._settingService.settings()?.version;
   }
}
