import { Routes } from "@angular/router";
import { ErrorComponent } from "./components/common/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { ProblemsComponent } from "./components/problems/problems.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { UserAppConfigComponent } from "./components/home/user-app-config/user-app-config.component";
import { AppIconSelectorComponent } from "./components/home/app-icon-selector/app-icon-selector.component";

export const routes: Routes = [
   {
      path: "",
      component: SplashScreenComponent,
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
      path: "error/:code",
      component: ErrorComponent,
   },
   {
      path: "**",
      redirectTo: "/error/404",
      pathMatch: "full",
   },
];
