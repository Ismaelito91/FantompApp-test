import { Component } from "@angular/core";
import { PageContentComponent } from "../page-content/page-content.component";

@Component({
   selector: "app-app-info",
   imports: [PageContentComponent],
   template: `
      <app-page-content
         pageCode="2.5_cest-quoi-cette-app"
         variant="app-info"
      ></app-page-content>
   `,
})
export class AppInfoComponent {}
