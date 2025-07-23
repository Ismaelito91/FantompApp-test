import { Component, inject, OnInit } from "@angular/core";
import { ThemeService, ThemeType } from "../../../service/theme.service";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";

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
      TranslateModule,
   ],
})
export class UserAppConfigComponent implements OnInit {
   private translateService = inject(TranslateService);

   constructor(public themeService: ThemeService) {}

   async ngOnInit() {
      try {
         // Initialisation des traductions
         await firstValueFrom(this.translateService.use("fr"));

         // Vérification que les traductions sont chargées
         const translation = await this.translateService.get(
            "USER_CONFIG_APP.TITLE"
         );

         console.log("Translation loaded:", translation);
      } catch (error) {
         console.error("Error loading translations:", error);
      }
   }

   isThemeSelected(themeName: ThemeType): boolean {
      return this.themeService.selectedTheme()?.name === themeName;
   }

   setTheme(themeName: ThemeType): void {
      this.themeService.setTheme(themeName);
   }
}
