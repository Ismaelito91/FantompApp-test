import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Subscription } from "rxjs";
import { ComponentStatus } from "../../model/enum/component-status.enum";
import { ComponentType } from "../../model/enum/component-type.enum";
import PageComponentModel from "../../model/page-component.model";
import { PageTranslationPipe } from "../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import { PageComponentService } from "../../service/page-component.service";
import { PageComponentUtilsService } from "../../service/page-component-utils.service";
import { ZoomLayoutService } from "../../service/zoom-layout.service";
import { Card7Component } from "../design-system/card-7/card-7.component";
import { DividerComponent } from "../design-system/divider/divider.component";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
   selector: "app-secure-myself",
   imports: [
      Card7Component,
      DividerComponent,
      SafeHtmlPipe,
      DividerComponent,
      Card7Component,
      PageTranslationPipe,
      TranslatePipe,
   ],
   templateUrl: "./secure-myself.component.html",
   styleUrl: "./secure-myself.component.scss",
})
export class SecureMyselfComponent implements OnInit, OnDestroy {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly zoomLayout = inject(ZoomLayoutService);
   private subscription?: Subscription;

   rootPage = signal<PageComponentModel>({
      id: 0,
      translations: [],
      childrenIdList: [],
   });
   page = signal<PageComponentModel | null>({
      id: 0,
      translations: [],
      childrenIdList: [],
   });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   shouldUseZoomLayout(): boolean {
      return this.zoomLayout.isZoomAtLeast(1.7);
   }

   ngOnInit(): void {
      this.loadRootPage();

      // S'abonner aux changements de la componentMap (lors de setOverride par exemple)
      this.subscription =
         this.pageComponentUtils.onComponentMapUpdated$.subscribe(() => {
            this.refreshPageData();
         });
   }

   ngOnDestroy(): void {
      this.subscription?.unsubscribe();
   }

   private loadRootPage(): void {
      let rootPage = this.pageComponentUtils.findRootPage(2);
      if (!rootPage) {
         this.pageComponentService
            .getRootPageComponentsBySectionId(2)
            .subscribe({
               next: (data) => {
                  console.log("secure my sefl response");
                  this.pageComponentUtils.updateComponentMap(data);
                  let rootPage = this.pageComponentUtils.findRootPage(2);
                  if (rootPage) {
                     this.rootPage.set(rootPage);
                     this.page.set(rootPage);
                  }
               },
               error: (err) =>
                  console.error("Erreur lors du chargement des problèmes", err),
            });
      } else {
         this.rootPage.set(rootPage);
         this.page.set(rootPage);
      }
   }

   /**
    * Rafraîchit les données de la page depuis la componentMap mise à jour
    */
   private refreshPageData(): void {
      const rootPage = this.pageComponentUtils.findRootPage(2);
      if (rootPage) {
         this.rootPage.set(rootPage);
         this.page.set(rootPage);
         console.log(
            "secure-myself: Page rafraîchie suite à la mise à jour du device"
         );
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
