import { Routes } from "@angular/router";
import { ErrorComponent } from "./components/common/error/error.component";
import { AppIconSelectorComponent } from "./components/home/app-icon-selector/app-icon-selector.component";
import { AppInfoComponent } from "./components/home/app-info/app-info.component";
import { HomeComponent } from "./components/home/home.component";
import { OnboardingComponent } from "./components/home/onboarding/onboarding.component";
import { UserAppConfigComponent } from "./components/home/user-app-config/user-app-config.component";
import { DeleteContentComponent } from "./components/problems/delete-content/delete-content.component";
import { ReportedContentComponent } from "./components/problems/delete-content/reported-content/reported-content.component";
import { ViolentContentComponent } from "./components/problems/delete-content/violent-content/violent-content.component";
import { UnreportedContentComponent } from "./components/problems/delete-content/unreported-content/unreported-content.component";
import { HackingComponent } from "./components/problems/hacking/hacking.component";
import { ProblemsComponent } from "./components/problems/problems.component";
import { SecureMyselfComponent } from "./components/secure-myself/secure-myself.component";
import { ViewAllComponent } from "./components/secure-myself/view-all/view-all.component";
import { ViewStepsComponent } from "./components/secure-myself/view-steps/view-steps.component";
import { SplashScreenComponent } from "./components/splash-screen/splash-screen.component";
import { BlurImageComponent } from "./components/tools/blur-image/blur-image.component";
import { PasswordCheckComponent } from "./components/tools/password-check/password-check.component";
import { ToolsComponent } from "./components/tools/tools.component";
import { VisibilityCheckComponent } from "./components/tools/visibility-check/visibility-check.component";
import { VisibilityResultsComponent } from "./components/tools/visibility-check/visibility-results/visibility-results.component";
import { ComplaintComponent } from "./components/problems/delete-content/reported-content/complaint/complaint.component";
import { NoAccessComponent } from "./components/problems/hacking/no-access/no-access.component";
import { RecommendationsComponent } from "./components/problems/hacking/no-access/recommendations/recommendations.component";
import { ActionsComponent } from "./components/problems/hacking/actions/actions.component";
import { HaveAccessComponent } from "./components/problems/hacking/have-access/have-access.component";
import { UserRightsComponent } from "./components/home/user-rights/user-rights.component";

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
      path: "app-info",
      component: AppInfoComponent,
      data: { hideHeader: true },
   },
   {
      path: "user-rights",
      component: UserRightsComponent,
      data: { hideHeader: true },
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
            data: { hideHeader: true, hideFooter: true },
         },
         {
            path: "visibility-check",
            component: VisibilityCheckComponent,
            pathMatch: "full",
            data: { hideHeader: true, hideFooter: true },
         },
         {
            path: "visibility-check/results",
            component: VisibilityResultsComponent,
            pathMatch: "full",
            data: { hideHeader: true, hideFooter: true },
         },
      ],
   },
   {
      path: "problems",
      component: ProblemsComponent,
      children: [
         {
            path: ":id",
            component: ProblemsComponent,
            data: { hideHeader: true, hideFooter: true },
         },
      ],
   },
   {
      path: "delete-content",
      children: [
         {
            path: "",
            component: DeleteContentComponent,
            pathMatch: "full",
            data: { hideFooter: true, hideHeader: true },
         },
         {
            path: "reported-content",
            children: [
               {
                  path: "",
                  component: ReportedContentComponent,
                  data: { hideFooter: true, hideHeader: true },
               },
               {
                  path: "complaint",
                  component: ComplaintComponent,
                  data: { hideFooter: true, hideHeader: true },
               },
            ],
         },
         {
            path: "unreported-content",
            component: UnreportedContentComponent,
            data: { hideFooter: true, hideHeader: true },
         },
         {
            path: "violent-content",
            component: ViolentContentComponent,
            data: { hideFooter: true, hideHeader: true },
         },
      ],
   },
   {
      path: "hacking",
      children: [
         {
            path: "",
            component: HackingComponent,
            pathMatch: "full",
            data: { hideFooter: true, hideHeader: true },
         },
         {
            path: "have-access",
            children: [
               {
                  path: "",
                  component: HaveAccessComponent,
                  data: { hideFooter: true, hideHeader: true },
               },
               {
                  path: ":id/actions",
                  component: ActionsComponent,
                  data: { hideFooter: true, hideHeader: true },
               },
            ],
         },
         {
            path: "no-access",
            children: [
               {
                  path: "",
                  component: NoAccessComponent,
                  data: { hideFooter: true, hideHeader: true },
               },
               {
                  path: "recommendations",
                  component: RecommendationsComponent,
                  data: { hideFooter: true, hideHeader: true },
               },
            ],
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
            data: { hideFooter: true, hideHeader: true },
         },
         {
            path: ":id/steps",
            component: ViewStepsComponent,
            pathMatch: "full",
            data: { hideFooter: true, hideHeader: true },
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
