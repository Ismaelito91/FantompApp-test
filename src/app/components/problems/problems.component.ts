import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ComponentStatus } from '../../model/enum/component-status.enum';
import { ComponentType } from '../../model/enum/component-type.enum';
import PageComponentModel from '../../model/page-component.model';
import { PageComponentService } from '../../service/page-component.service';
import { PageComponentUtilsService } from '../../service/page-component-utils.service';
import { Card1Component } from "../design-system/card-1/card-1.component";
import { Card2Component } from "../design-system/card-2/card-2.component";
import { Card3Component } from "../design-system/card-3/card-3.component";
import { Card4Component } from "../design-system/card-4/card-4.component";
import { Card5Component } from "../design-system/card-5/card-5.component";
import { Card6Component } from "../design-system/card-6/card-6.component";
import { DividerComponent } from '../design-system/divider/divider.component';
import { PageTranslationPipe } from '../../pipes/page-translation.pipe';

@Component({
   selector: 'app-problems',
   standalone: true,
   imports: [Card1Component, RouterLink, MatButtonModule, MatIconModule, Card2Component, Card3Component,
      Card4Component, Card5Component, Card6Component, DividerComponent, PageTranslationPipe],
   templateUrl: './problems.component.html',
   styleUrl: './problems.component.scss'
})
export class ProblemsComponent implements OnInit, OnDestroy {

   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private sub!: Subscription;
   private problemId = signal<number | null>(null);
   rootPage = signal<PageComponentModel>({ id: 0, translations: [], childrenIdList: [] });
   page = signal<PageComponentModel | null>({ id: 0, translations: [], childrenIdList: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   ngOnInit(): void {
      this.loadRootPage();
      this.sub = this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event: NavigationEnd) => {
            this.loadProblem();
         });
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   private loadProblem() {
      const problemIdUrl = this.route.firstChild?.snapshot.params['id'];
         if (!Number.isNaN(parseInt(problemIdUrl))) {
            this.problemId.set(parseInt(problemIdUrl));
         } else {
            this.problemId.set(null);
         }

         // this.page.set(this.findItemById(this.rootPage(), this.problemId()));
         this.page.set(this.pageComponentUtils.getComponentById(this.problemId()!));
   }

   private loadRootPage(): void {
      let rootPage = this.pageComponentUtils.findRootPage(1);
      if (!rootPage) {
         this.pageComponentService.getRootPageComponentsBySectionId(1).subscribe({
            next: (data) => {
               this.pageComponentUtils.updateComponentMap(data);
               let rootPage = this.pageComponentUtils.findRootPage(1);
               if (rootPage) {
                  this.rootPage.set(rootPage);
                  this.page.set(rootPage);
               }
            },
            error: (err) => console.error('Erreur lors du chargement des problèmes', err)
         });
      } else {
         this.rootPage.set(rootPage);
         this.page.set(rootPage);
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
