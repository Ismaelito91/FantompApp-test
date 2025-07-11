import { Component, effect, inject } from "@angular/core";
import { SettingService } from "../../service/setting.service";
import packageInfo from "../../../../package.json";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../../service/theme.service";
import { AsyncPipe } from "@angular/common";

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
      AsyncPipe,
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
