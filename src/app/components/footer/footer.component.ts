import { Component } from "@angular/core";
import { SettingService } from "../../service/setting.service";
import packageInfo from "../../../../package.json";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

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
})
export class FooterComponent {
   constructor(private _settingService: SettingService) {}

   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return this._settingService.settings()?.version;
   }
}
