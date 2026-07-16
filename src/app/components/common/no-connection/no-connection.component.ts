import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
   selector: "app-no-connection",
   standalone: true,
   imports: [TranslateModule],
   templateUrl: "./no-connection.component.html",
   styleUrl: "./no-connection.component.scss",
})
export class NoConnectionComponent {
   reload(): void {
      window.location.reload();
   }
}
