import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { TranslateModule } from "@ngx-translate/core";
import { ThemeService, ThemeType } from "../../../service/theme.service";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";

@Component({
   selector: "app-user-app-config",
   templateUrl: "./user-app-config.component.html",
   styleUrls: ["./user-app-config.component.scss"],
   standalone: true,
   imports: [
      MatRadioModule,
      MatIconModule,
      MatButtonModule,
      TranslateModule,
      ButtonBackComponent
   ],
})
export class UserAppConfigComponent {
   constructor(public themeService: ThemeService) { }

   isThemeSelected(themeName: ThemeType): boolean {
      return this.themeService.selectedTheme()?.name === themeName;
   }

   setTheme(themeName: ThemeType): void {
      this.themeService.setTheme(themeName);
   }
}
