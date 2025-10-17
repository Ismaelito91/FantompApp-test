import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";
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
export class UserAppConfigComponent implements OnInit {
   private translateService = inject(TranslateService);

   constructor(public themeService: ThemeService) { }

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
