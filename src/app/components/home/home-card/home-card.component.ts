import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
   selector: "app-home-card",
   standalone: true,
   imports: [CommonModule],
   templateUrl: "./home-card.component.html",
   styleUrls: ["./home-card.component.scss"],
})
export class HomeCardComponent {
   constructor(private router: Router) {}

   navigateToTools(): void {
      this.router.navigate(["/tools"]);
   }

   onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToTools();
      }
   }
}
