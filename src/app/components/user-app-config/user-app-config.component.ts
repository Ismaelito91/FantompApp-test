import { Component } from "@angular/core";
import { ThemeService, ThemeType } from "../../service/theme.service"; // adapte le chemin si besoin
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";

@Component({
   selector: "app-user-app-config",
   templateUrl: "./user-app-config.component.html",
   styleUrls: ["./user-app-config.component.scss"],
   standalone: true,
   imports: [
      MatRadioModule,
      MatIconModule,
      MatButtonModule,
      RouterModule,
      NgFor,
      NgIf,
      NgSwitch,
      NgSwitchCase,
   ],
})
export class UserAppConfigComponent {
   constructor(public themeService: ThemeService) {}

   get themes() {
      return this.themeService.getThemes();
   }

   get selectedTheme() {
      return this.themeService.selectedTheme();
   }

   setTheme(themeName: ThemeType) {
      this.themeService.setTheme(themeName);
   }
}
