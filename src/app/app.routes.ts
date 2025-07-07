import { Routes } from "@angular/router";
import { ErrorComponent } from "./components/common/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { ProblemsComponent } from "./components/problems/problems.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { UserAppConfigComponent } from "./components/home/user-app-config/user-app-config.component";
import { AppIconSelectorComponent } from "./components/home/app-icon-selector/app-icon-selector.component";
import { SecureMyselfComponent } from "./components/secure-myself/secure-myself.component";

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
      component: SecureMyselfComponent
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
