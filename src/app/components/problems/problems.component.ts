import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ComponentStatus } from '../../model/enum/component-status.enum';
import { ComponentType } from '../../model/enum/component-type.enum';
import { Device } from '../../model/enum/device.enum';
import PageComponentModel from '../../model/page-component.model';
import { PageTranslationPipe } from '../../pipes/page-translation.pipe';
import { LanguageService } from '../../service/language.service';
import { PageComponentUtilsService } from '../../service/page-component-utils.service';
import { PageComponentService } from '../../service/page-component.service';
import { Card1Component } from "../design-system/card-1/card-1.component";
import { Card2Component } from "../design-system/card-2/card-2.component";
import { Card3Component } from "../design-system/card-3/card-3.component";
import { Card4Component } from "../design-system/card-4/card-4.component";
import { Card5Component } from "../design-system/card-5/card-5.component";
import { Card6Component } from "../design-system/card-6/card-6.component";
import { DividerComponent } from '../design-system/divider/divider.component';
import { ButtonBackComponent } from "../design-system/button-back/button-back.component";
import { Card14Component } from "../design-system/card-14/card-14.component";
import { TranslatePipe } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
   selector: 'app-problems',
   standalone: true,
   imports: [Card1Component, RouterLink, MatButtonModule, MatIconModule, Card2Component, Card3Component,
      Card4Component, Card5Component, Card6Component, DividerComponent, PageTranslationPipe, ButtonBackComponent, Card14Component,
      TranslatePipe, SafeHtmlPipe
   ],
   templateUrl: './problems.component.html',
   styleUrl: './problems.component.scss'
})
export class ProblemsComponent implements OnInit, OnDestroy {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly languageService = inject(LanguageService);
   private readonly router = inject(Router);
   private readonly route = inject(ActivatedRoute);
   private sub!: Subscription;
   private problemId = signal<number | null>(null);
   rootPage = signal<PageComponentModel>({ id: 0, translations: [], childrenIdList: [] });
   page = signal<PageComponentModel | null>({ id: 0, translations: [], childrenIdList: [] });
   deleteContentProblem: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_1,
      status: ComponentStatus.PUBLISHED,
      code: "3.1_effacer_contenu",
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.DELETE_CONTENT.CARD.FIRST_TITLE",
            secondTitle: "PROBLEMS.DELETE_CONTENT.CARD.SECOND_TITLE",
            description: "PROBLEMS.DELETE_CONTENT.CARD.DESCRIPTION",
            staticImage: "assets/images/delete-content-problem.png"
         }
      ]
   };
   hackingProblem: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_1,
      status: ComponentStatus.PUBLISHED,
      code: "3.2_piratage",
      position: 2,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle: "PROBLEMS.HACKING.CARD.FIRST_TITLE",
            secondTitle: "PROBLEMS.HACKING.CARD.SECOND_TITLE",
            description: "PROBLEMS.HACKING.CARD.DESCRIPTION",
            staticImage: "assets/images/hacking-problem.png"
         }
      ]
   };
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   ngOnInit(): void {
      this.loadRootPage();
      // Initialisation pour l'URL courante
      this.loadProblem();

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
         let targetPage = this.pageComponentUtils.getComponentById(this.problemId()!);
         if (!targetPage) {
            this.pageComponentService.getRootPageComponentsBySectionId(1).subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  let rootPage = this.pageComponentUtils.findRootPage(1);
                  targetPage = this.pageComponentUtils.getComponentById(this.problemId()!);
                  if (rootPage) {
                     this.rootPage.set(rootPage);
                     this.page.set(targetPage);
                  }
               },
               error: (err) => console.error('Erreur lors du chargement des problèmes', err)
            });
         } else {
            this.page.set(targetPage);
         }
      } else {
         this.problemId.set(null);
         this.page.set(this.rootPage());
      }
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
