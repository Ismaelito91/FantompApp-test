import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, Subscription } from 'rxjs';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { PageComponentService } from '../../../service/page-component.service';
import { ButtonBackComponent } from '../../design-system/button-back/button-back.component';
import { Card14Component } from '../../design-system/card-14/card-14.component';
import { Card3Component } from '../../design-system/card-3/card-3.component';
import { Card4Component } from '../../design-system/card-4/card-4.component';
import { Card5Component } from '../../design-system/card-5/card-5.component';
import { Card6Component } from '../../design-system/card-6/card-6.component';
import { DividerComponent } from '../../design-system/divider/divider.component';

@Component({
   selector: 'app-resources',
   imports: [Card3Component, Card4Component, Card5Component, Card6Component, Card14Component, DividerComponent, RouterLink, ButtonBackComponent, PageTranslationPipe, TranslatePipe, SafeHtmlPipe],
   templateUrl: './resources.component.html',
   styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private sub!: Subscription;
   private resourceId = signal<number | null>(null);
   rootPage = signal<PageComponentModel>({ id: 0, translations: [], childrenIdList: [] });
   page = signal<PageComponentModel | null>({ id: 0, translations: [], childrenIdList: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   ngOnInit(): void {
      this.loadRootPage();
      // Initialisation pour l'URL courante
      this.loadResource();

      this.sub = this.router.events
         .pipe(filter(event => event instanceof NavigationEnd))
         .subscribe((event: NavigationEnd) => {
            this.loadResource();
         });
   }

   ngOnDestroy() {
      this.sub.unsubscribe();
   }

   private loadResource() {
      const resourceIdUrl = this.route.firstChild?.snapshot.params['id'];
      if (!Number.isNaN(parseInt(resourceIdUrl))) {
         this.resourceId.set(parseInt(resourceIdUrl));
         let targetPage = this.pageComponentUtils.getComponentById(this.resourceId()!);
         if (!targetPage) {
            this.pageComponentService.getRootPageComponentsBySectionId(3).subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  let rootPage = this.pageComponentUtils.findRootPage(3);
                  targetPage = this.pageComponentUtils.getComponentById(this.resourceId()!);
                  if (rootPage) {
                     this.rootPage.set(rootPage);
                     this.page.set(targetPage);
                  }
               },
               error: (err) => console.error('Erreur lors du chargement des ressources', err)
            });
         } else {
            this.page.set(targetPage);
         }
      } else {
         this.resourceId.set(null);
         this.page.set(this.rootPage());
      }
   }

   private loadRootPage(): void {
      let rootPage = this.pageComponentUtils.findRootPage(3);
      if (!rootPage) {
         this.pageComponentService.getRootPageComponentsBySectionId(3).subscribe({
            next: (data) => {
               this.pageComponentUtils.updateComponentMap(data);
               let rootPage = this.pageComponentUtils.findRootPage(3);
               if (rootPage) {
                  this.rootPage.set(rootPage);
                  this.page.set(rootPage);
               }
            },
            error: (err) => console.error('Erreur lors du chargement des ressources', err)
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
