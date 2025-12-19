import { Component } from "@angular/core";
import { PageContentComponent } from "../page-content/page-content.component";

@Component({
   selector: "app-resources",
   imports: [PageContentComponent],
   template: `
      <app-page-content
         pageCode="2.7_ressources"
         variant="resources"
      ></app-page-content>
   `,
})
export class ResourcesComponent {}
