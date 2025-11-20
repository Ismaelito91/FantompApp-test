import { Component, inject, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ComponentStatus } from "../../../../model/enum/component-status.enum";
import { ComponentType } from "../../../../model/enum/component-type.enum";
import PageComponentModel from "../../../../model/page-component.model";
import { PageTranslationPipe } from "../../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../../pipes/safe-html.pipe";
import { PageComponentUtilsService } from "../../../../service/page-component-utils.service";
import { PageComponentService } from "../../../../service/page-component.service";
import { UtilsService } from "../../../../service/utils.service";
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../../design-system/button/button.component";
import { Card13Component } from "../../../design-system/card-13/card-13.component";
import { Card15Component } from "../../../design-system/card-15/card-15.component";
import { DividerComponent } from "../../../design-system/divider/divider.component";

const PAGE_CODE = "3.2.17_non_acces_compte";

@Component({
   selector: "app-no-access",
   imports: [
      ButtonBackComponent,
      TranslatePipe,
      ButtonComponent,
      Card13Component,
      Card15Component,
      DividerComponent,
      PageTranslationPipe,
      SafeHtmlPipe,
   ],
   templateUrl: "./no-access.component.html",
   styleUrl: "./no-access.component.scss",
})
export class NoAccessComponent {
   readonly utilsService = inject(UtilsService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly pageComponentService = inject(PageComponentService);
   page = signal<PageComponentModel | null>({
      id: 0,
      translations: [],
      childrenIdList: [],
   });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   ngOnInit(): void {
      this.loadRootPage();
   }

   private loadRootPage(): void {
      let pageNoAccess = this.pageComponentUtils.getComponentByCode(PAGE_CODE);
      this.page.set(pageNoAccess);
      if (!pageNoAccess) {
         this.pageComponentService
            .getRootPageComponentsBySectionId(1)
            .subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  pageNoAccess =
                     this.pageComponentUtils.getComponentByCode(PAGE_CODE);
                  this.page.set(pageNoAccess);
               },
               error: (err) =>
                  console.error("Erreur lors du chargement de problèmes", err),
            });
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
