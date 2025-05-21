import { Routes } from "@angular/router";
import { ErrorComponent } from "./components/common/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { ProblemsComponent } from "./components/problems/problems.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { UserAppConfigComponent } from "./components/user-app-config/user-app-config.component";

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
      path: "error/:code",
      component: ErrorComponent,
   },
   {
      path: "**",
      redirectTo: "/error/404",
      pathMatch: "full",
   },
];
