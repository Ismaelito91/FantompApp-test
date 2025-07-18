import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PageComponentService } from "../../../service/page-component.service";

@Component({
   selector: "app-home-card",
   standalone: true,
   imports: [CommonModule],
   templateUrl: "./home-card.component.html",
   styleUrls: ["./home-card.component.scss"],
})
export class HomeCardComponent implements OnInit {
   private pageComponentService = inject(PageComponentService);
   private homePageLinkIds: Map<string, number> = new Map();

   constructor(private router: Router) {}

   ngOnInit(): void {
      // Initialisation de base
      this.pageComponentService.getHomePageLinkIds().subscribe({
         next: (data) => {
            this.homePageLinkIds = new Map(Object.entries(data));
         }
      });
   }

   navigateToTools(): void {
      this.router.navigate(["/tools"]);
   }

   navigateToHarassment(): void {
      this.router.navigate(["/problems/" + this.homePageLinkIds.get("3.3_cyberharcelement") || ""]);
   }

   onKeyDown(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToTools();
      }
   }

   onKeyDownHarassment(event: KeyboardEvent): void {
      if (event.key === "Enter" || event.key === " ") {
         event.preventDefault();
         this.navigateToHarassment();
      }
   }
}
