import { Component } from "@angular/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
   selector: "app-user-rights",
   imports: [ButtonBackComponent, TranslatePipe],
   templateUrl: "./user-rights.component.html",
   styleUrl: "./user-rights.component.scss",
})
export class UserRightsComponent {}
