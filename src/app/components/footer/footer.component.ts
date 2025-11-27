import { Component, effect, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import packageInfo from "../../../../package.json";
import { SettingService } from "../../service/setting.service";
import { ThemeService } from "../../service/theme.service";
import { OnboardingService } from "../../service/onboarding.service";

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
   // theme as a signal so template getters react to changes
   theme = signal<"dark" | "clear">("clear");
   get isHomeActive() {
      // À adapter selon ta logique d'activation du bouton Home
      return location.pathname === "/home";
   }

   get homeIconSrc() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return this.isHomeActive ? `home-${theme}-active` : `home-${theme}`;
   }

   get homeIconInactive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `home-${theme}`;
   }

   get homeIconActive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `home-${theme}-active`;
   }

   get problemIconSrc() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return this.isProblemIconActive
         ? `problem-${theme}-active`
         : `problem-${theme}`;
   }

   get problemIconInactive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `problem-${theme}`;
   }

   get problemIconActive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `problem-${theme}-active`;
   }

   get toolsIconSrc() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return this.isToolsIconActive
         ? `tools-${theme}-active`
         : `tools-${theme}`;
   }

   get toolsIconInactive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `tools-${theme}`;
   }

   get toolsIconActive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `tools-${theme}-active`;
   }

   get secureIconSrc() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return this.isSecureMyselfIconActive
         ? `secure-${theme}-active`
         : `secure-${theme}`;
   }

   get secureIconInactive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `secure-${theme}`;
   }

   get secureIconActive() {
      const theme = this.theme() === "dark" ? "dark" : "clear";
      return `secure-${theme}-active`;
   }
   private _settingService = inject(SettingService);
   private themeService = inject(ThemeService);
   private onboardingService = inject(OnboardingService);

   toolsInactiveIcon: string = "tools-clear-inactive";
   toolsActiveIcon: string = "tools-clear-active";

   constructor() {
      effect(() => {
         const isDark = this.themeService.isDark$();
         this.theme.set(isDark ? "dark" : "clear");
         // debug: log icon names used for tools
         console.log(
            "[Footer] theme=",
            this.theme(),
            "toolsIconActive=",
            this.toolsIconActive,
            "toolsIconInactive=",
            this.toolsIconInactive
         );
      });
   }

   get frontendVersion() {
      return packageInfo.version;
   }

   get isProblemIconActive() {
      return this.onboardingService.isProblemIconActive();
   }

   get isToolsIconActive() {
      return this.onboardingService.isToolsIconActive();
   }

   get isSecureMyselfIconActive() {
      return this.onboardingService.isSecureMyselfIconActive();
   }
}
