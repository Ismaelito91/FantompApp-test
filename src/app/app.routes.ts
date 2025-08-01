import { Routes } from "@angular/router";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { HomeComponent } from "./components/home/home.component";
import { UserAppConfigComponent } from "./components/home/user-app-config/user-app-config.component";
import { AppIconSelectorComponent } from "./components/home/app-icon-selector/app-icon-selector.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { ProblemsComponent } from "./components/problems/problems.component";
import { SecureMyselfComponent } from "./components/secure-myself/secure-myself.component";
import { ViewAllComponent } from "./components/secure-myself/view-all/view-all.component";
import { ViewStepsComponent } from "./components/secure-myself/view-steps/view-steps.component";
import { ErrorComponent } from "./components/common/error/error.component";
import { OnboardingComponent } from "./components/home/onboarding/onboarding.component";
import { PasswordCheckComponent } from "./components/tools/password-check/password-check.component";
import { VisibilityCheckComponent } from "./components/tools/visibility-check/visibility-check.component";
import { BlurImageComponent } from "./components/tools/blur-image/blur-image.component";
import { VisibilityResultsComponent } from "./components/tools/visibility-check/visibility-results/visibility-results.component";

export const routes: Routes = [
   {
      path: "",
      component: SplashScreenComponent,
   },
   {
      path: "onboarding",
      component: OnboardingComponent,
   },
   {
      path: "home",
      component: HomeComponent,
   },
   {
      path: "user-app-config",
      component: UserAppConfigComponent,
   },
   {
      path: "changer-icone",
      component: AppIconSelectorComponent,
   },
   {
      path: "tools",
      children: [
         {
            path: "",
            component: ToolsComponent,
            pathMatch: "full",
         },
         {
            path: "password-check",
            component: PasswordCheckComponent,
            pathMatch: "full",
            data: { hideHeader: true, hideFooter: true },
         },
         {
            path: "blur-image",
            component: BlurImageComponent,
            pathMatch: "full",
            data: { hideHeader: false, hideFooter: true }
         },
         {
            path: "visibility-check",
            component: VisibilityCheckComponent,
            pathMatch: "full",
            data: { hideHeader: true, hideFooter: true }
         },
         {
            path: "visibility-check/results",
            component: VisibilityResultsComponent,
            pathMatch: "full",
            data: { hideHeader: true, hideFooter: true },
         }
      ]
   },
   {
      path: "problems",
      component: ProblemsComponent,
      children: [
         {
            path: ":id",
            component: ProblemsComponent,
         },
      ],
   },
   {
      path: "secure-myself",
      children: [
         {
            path: "",
            component: SecureMyselfComponent,
            pathMatch: "full",
         },
         {
            path: ":id",
            component: ViewAllComponent,
            pathMatch: "full",
            data: { hideFooter: true },
         },
         {
            path: ":id/steps",
            component: ViewStepsComponent,
            pathMatch: "full",
            data: { hideFooter: true },
         },
      ],
   },
   {
      path: "error/:code",
      component: ErrorComponent,
   },
   {
      path: "**",
      redirectTo: "/error/404",
      pathMatch: "full",
   },
];
