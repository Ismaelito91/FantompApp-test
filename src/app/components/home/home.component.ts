import { Component, inject } from "@angular/core";
import { Platform } from "@angular/cdk/platform";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import packageInfo from "../../../../package.json";
import { SettingService } from "../../service/setting.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ThemeService } from "../../service/theme.service";
import { OnboardingService } from "../../service/onboarding.service";
import { OnboardingComponent } from "./onboarding/onboarding.component";
import { computed } from "@angular/core";
import { HomeCardComponent } from "./home-card/home-card.component";

@Component({
   selector: "app-home",
   standalone: true,

   imports: [
      CommonModule,
      TranslateModule,
      MatButtonModule,
      MatIconModule,
      RouterModule,
      HomeCardComponent,
   ],
   templateUrl: "./home.component.html",
   styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
   private translateService = inject(TranslateService);
   private themeService = inject(ThemeService);
   private router = inject(Router);
   onboardingService = inject(OnboardingService);
   _settingService = inject(SettingService);
   private platform = inject(Platform);

   public shouldShowChangeIcon = false;

   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });

   constructor() {
      this.shouldShowChangeIcon =
         this.platform.isBrowser && !this.platform.IOS && !this.isTwa();
   }

   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return this._settingService.settings()?.version;
   }

   // Méthodes de navigation pour l'accessibilité RGAA
   onKeyDown(event: KeyboardEvent, route: string): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.router.navigate([route]);
      }
   }

   onKeyDownButton(event: KeyboardEvent, action: string): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.executeAction(action);
      }
   }

   private executeAction(action: string): void {
      switch (action) {
         case "resources":
            this.navigateToResources();
            break;
         case "what-is-app":
            this.navigateToWhatIsApp();
            break;
         case "rights":
            this.navigateToRights();
            break;
         case "accessibility":
            this.navigateToAccessibility();
            break;
         case "tutorial":
            this.navigateToTutorial();
            break;
         default:
            console.warn(`Action non reconnue: ${action}`);
      }
   }

   navigateToResources(): void {
      // TODO: Implémenter la navigation vers les ressources
      // this.router.navigate(['/resources']);
   }

   navigateToWhatIsApp(): void {
      // Lance l'onboarding quand l'utilisateur clique sur "C'est quoi cette app ?"
      this.onboardingService.showOnboarding();
   }

   navigateToRights(): void {
      this.router.navigate(["/user-rights"]);
   }

   navigateToAccessibility(): void {
      // TODO: Implémenter la navigation vers l'accessibilité
      // this.router.navigate(['/accessibility']);
   }

   navigateToTutorial(): void {
      this.onboardingService.showOnboarding();
   }

   private isTwa(): boolean {
      if (typeof window === "undefined") {
         return false;
      }
      if (document?.referrer?.includes("android-app:")) {
         return true;
      }
      try {
         const url = new URL(window.location.href);
         return url.searchParams.get("utm_source") === "trusted-web-activity";
      } catch {
         return false;
      }
   }
}
