import { Platform } from "@angular/cdk/platform";
import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentType } from "../../model/enum/component-type.enum";
import PageComponentModel from "../../model/page-component.model";
import { OnboardingService } from "../../service/onboarding.service";
import { PageComponentUtilsService } from "../../service/page-component-utils.service";
import { PageComponentService } from "../../service/page-component.service";
import { SettingService } from "../../service/setting.service";
import { ThemeService } from "../../service/theme.service";
import { Card7Component } from "../design-system/card-7/card-7.component";
import { HomeCardComponent } from "./home-card/home-card.component";
import { UtilsService } from "../../service/utils.service";

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
      Card7Component
   ],
   templateUrl: "./home.component.html",
   styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
   private themeService = inject(ThemeService);
   private router = inject(Router);
   private utilsService = inject(UtilsService);
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   //public shouldShowChangeIcon = false;
   public isDesktop = false;
   onboardingService = inject(OnboardingService);
   _settingService = inject(SettingService);
   rootPage = signal<PageComponentModel>({ translations: [] });
   page = signal<PageComponentModel | null>({ translations: [] });
   ComponentType = ComponentType;

   private loadRootPage(): void {
      let rootPage = this.pageComponentUtils.findRootPage(3);
      if (!rootPage) {
         this.pageComponentService.getRootPageComponentsBySectionId(3).subscribe({
            next: (data) => {
               this.pageComponentUtils.updateComponentMap(data);
               let rootPage = this.pageComponentUtils.findRootPage(3);
               if (rootPage) {
                  this.rootPage.set(rootPage);
                  this.page.set(rootPage);
               }
            },
            error: (err) => console.error('Erreur lors du chargement de home', err)
         });
      } else {
         this.rootPage.set(rootPage);
         this.page.set(rootPage);
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }

   isDarkMode = computed(() => {
      const theme = this.themeService.selectedTheme()?.name;
      return (
         theme === "dark" ||
         (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
   });

   ngOnInit(): void {
      this.isDesktop = this.utilsService.isDesktop();
      this.loadRootPage();
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
      this.router.navigate(['/resources']);
   }

   navigateToRights(): void {
      this.router.navigate(["/user-rights"]);
   }

   navigateToAccessibility(): void {
      this.router.navigate(['/accessibility']);
   }

   navigateToTutorial(): void {
      this.onboardingService.showOnboarding();
   }

}
