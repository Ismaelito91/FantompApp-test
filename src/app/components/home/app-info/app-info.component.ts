import { Component } from "@angular/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
   selector: "app-app-info",
   imports: [ButtonBackComponent, TranslatePipe],
   templateUrl: "./app-info.component.html",
   styleUrl: "./app-info.component.scss",
})
export class AppInfoComponent {}
