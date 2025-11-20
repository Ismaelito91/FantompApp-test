import { Component, inject, OnInit, signal } from "@angular/core";
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
import { Card4Component } from "../../../design-system/card-4/card-4.component";
import { Card5Component } from "../../../design-system/card-5/card-5.component";
import { DividerComponent } from "../../../design-system/divider/divider.component";

const PAGE_CODE = "3.1.11/18_contenu_violent";

@Component({
   selector: "app-violent-content",
   imports: [
      ButtonBackComponent,
      TranslatePipe,
      DividerComponent,
      Card4Component,
      Card5Component,
      ButtonComponent,
      PageTranslationPipe,
      SafeHtmlPipe,
   ],
   templateUrl: "./violent-content.component.html",
   styleUrl: "./violent-content.component.scss",
})
export class ViolentContentComponent implements OnInit {
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
   reported: boolean = false;

   ngOnInit(): void {
      const state = history.state as { reported: boolean };
      this.reported = state.reported;

      this.loadRootPage();
   }

   private loadRootPage(): void {
      let pageViolentContent = this.pageComponentUtils.getComponentByCode(PAGE_CODE);
      this.page.set(pageViolentContent);
      if (!pageViolentContent) {
         this.pageComponentService
            .getRootPageComponentsBySectionId(1)
            .subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  pageViolentContent = this.pageComponentUtils.getComponentByCode(PAGE_CODE);
                  this.page.set(pageViolentContent);
               },
               error: (err) => console.error("Erreur lors du chargement de problèmes", err),
            });
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
