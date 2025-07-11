import { Routes } from "@angular/router";
import { ErrorComponent } from "./components/common/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { ProblemsComponent } from "./components/problems/problems.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { UserAppConfigComponent } from "./components/home/user-app-config/user-app-config.component";
import { AppIconSelectorComponent } from "./components/home/app-icon-selector/app-icon-selector.component";
import { SecureMyselfComponent } from "./components/secure-myself/secure-myself.component";
import { ViewAllComponent } from "./components/secure-myself/view-all/view-all.component";
import { ViewStepsComponent } from "./components/secure-myself/view-steps/view-steps.component";

export const routes: Routes = [
   {
      path: "",
      component: SplashScreenComponent,
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
      component: ToolsComponent,
   },
   {
      path: "problems",
      component: ProblemsComponent,
      children: [
         {
            path: ":id",
            component: ProblemsComponent,
         }
      ]
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
         },
         {
            path: ":id/steps",
            component: ViewStepsComponent,
            pathMatch: "full",
         }
      ]
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
