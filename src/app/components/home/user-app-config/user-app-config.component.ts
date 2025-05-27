import { Component, inject, OnInit } from "@angular/core";
import { ThemeService, ThemeType } from "../../../service/theme.service"; // adapte le chemin si besoin
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
   selector: "app-user-app-config",
   templateUrl: "./user-app-config.component.html",
   styleUrls: ["./user-app-config.component.scss"],
   standalone: true,
   imports: [
      MatRadioModule,
      MatIconModule,
      MatButtonModule,
      RouterLink,
      NgFor,
      NgIf,
      NgSwitch,
      NgSwitchCase,
      TranslateModule,
   ],
})
export class UserAppConfigComponent implements OnInit {
   private translateService = inject(TranslateService);

   constructor(public themeService: ThemeService) {}

   async ngOnInit() {
      try {
         // Initialisation des traductions
         await this.translateService.use("fr").toPromise();

         // Vérification que les traductions sont chargées
         const translation = await this.translateService
            .get("USER_CONFIG_APP.TITLE")
            .toPromise();
         console.log("Translation loaded:", translation);
      } catch (error) {
         console.error("Error loading translations:", error);
      }
   }

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
