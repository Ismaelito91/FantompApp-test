import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslatePipe } from "@ngx-translate/core";
import { ButtonSize } from "../../../model/type/button-size.type";

@Component({
   selector: "app-button-back",
   imports: [MatIconModule, MatButtonModule, TranslatePipe],
   templateUrl: "./button-back.component.html",
   styleUrl: "./button-back.component.scss",
})
export class ButtonBackComponent {
   size = input<ButtonSize>("lg");

   onClick() {
      history.back();
   }
}
