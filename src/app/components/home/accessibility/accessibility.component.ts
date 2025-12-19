import { Component } from "@angular/core";
import { PageContentComponent } from "../page-content/page-content.component";

@Component({
   selector: "app-accessibility",
   imports: [PageContentComponent],
   template: `
      <app-page-content
         pageCode="2.8_accessibilite"
         variant="accessibility"
      ></app-page-content>
   `,
})
export class AccessibilityComponent {}
