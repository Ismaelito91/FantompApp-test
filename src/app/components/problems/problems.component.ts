import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ComponentStatus } from '../../model/enum/component-status.enum';
import { ComponentType } from '../../model/enum/component-type.enum';
import PageComponentModel from '../../model/page-component.model';
import { PageComponentService } from '../../service/page-component.service';
import { Card1Component } from "../design-system/card-1/card-1.component";
import { Card2Component } from "../design-system/card-2/card-2.component";
import { Card3Component } from "../design-system/card-3/card-3.component";
import { Card4Component } from "../design-system/card-4/card-4.component";
import { Card5Component } from "../design-system/card-5/card-5.component";
import { Card6Component } from "../design-system/card-6/card-6.component";
import { DividerComponent } from '../design-system/divider/divider.component';

@Component({
   selector: 'app-problems',
   standalone: true,
   imports: [Card1Component, RouterLink, MatButtonModule, MatIconModule, Card2Component, Card3Component,
      Card4Component, Card5Component, Card6Component, DividerComponent],
   templateUrl: './problems.component.html',
   styleUrl: './problems.component.scss'
})
export class ProblemsComponent implements OnInit, OnDestroy {

   private readonly pageComponentService = inject(PageComponentService);
   private readonly router = inject(Router);
   private sub!: Subscription;
   private problemId = signal<number | null>(null);
   rootPage = signal<PageComponentModel>({ id: 0, translations: [], children: [] });
   page = signal<PageComponentModel | null>({ id: 0, translations: [], children: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;
   ngOnInit(): void {
      this.loadRootPage();
      // TODO set the problemId to the current problem id

      this.sub = this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event: NavigationEnd) => {
            const problemIdUrl = event.urlAfterRedirects.split('/')[2];
            if (!Number.isNaN(parseInt(problemIdUrl))) {
               this.problemId.set(parseInt(problemIdUrl));
            } else {
               this.problemId.set(null);
            }

            // this.page.set(this.findItemById(this.rootPage(), this.problemId()));
            this.page.set(this.findNextById(this.rootPage(), this.problemId()));
         });
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   private loadRootPage(): void {
      this.pageComponentService.getRootPageComponentsBySectionId(1).subscribe({
         next: (data) => {
            this.rootPage.set(data);
            this.page.set(data);
         },
         error: (err) => console.error('Erreur lors du chargement des problèmes', err)
      });

   }

   findItemById(item: PageComponentModel, id: number | null): PageComponentModel | null {
      if (item.next) {
         for (const child of item.children) {
            const found: PageComponentModel | null = this.findItemById(child, id);
            if (found) {
               return found;
            }
         }
      }
      return item;
   }

   findNextById(item: PageComponentModel, id: number | null): PageComponentModel | null {
      if (item.next && item.next.id === id) {
         return item.next;
      }

      if (item.children && item.children.length > 0) {
         for (const child of item.children) {
            const result: PageComponentModel | null = this.findNextById(child, id);
            if (result) {
               return result;
            }
         }
      }

      return null;
   }

   get sortedChildren() {
      const children = this.page()?.children ?? [];
      return [...children].sort((a, b) => a.position! - b.position!);
   }
}
