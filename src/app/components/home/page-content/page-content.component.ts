import { Component, Input, OnInit, inject, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ComponentStatus } from "../../../model/enum/component-status.enum";
import { ComponentType } from "../../../model/enum/component-type.enum";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageComponentUtilsService } from "../../../service/page-component-utils.service";
import { PageComponentService } from "../../../service/page-component.service";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { Card14Component } from "../../design-system/card-14/card-14.component";
import { Card3Component } from "../../design-system/card-3/card-3.component";
import { Card4Component } from "../../design-system/card-4/card-4.component";
import { Card5Component } from "../../design-system/card-5/card-5.component";
import { Card6Component } from "../../design-system/card-6/card-6.component";
import { DividerComponent } from "../../design-system/divider/divider.component";

export type PageVariant = "app-info" | "accessibility" | "resources";

@Component({
   selector: "app-page-content",
   imports: [
      Card3Component,
      Card4Component,
      Card5Component,
      Card6Component,
      Card14Component,
      DividerComponent,
      ButtonBackComponent,
      PageTranslationPipe,
      TranslatePipe,
      SafeHtmlPipe,
   ],
   templateUrl: "./page-content.component.html",
   styleUrl: "./page-content.component.scss",
})
export class PageContentComponent implements OnInit {
   @Input({ required: true }) pageCode!: string;
   @Input({ required: true }) variant!: PageVariant;

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
      let pageData = this.pageComponentUtils.getComponentByCode(this.pageCode);
      this.page.set(pageData);
      if (!pageData) {
         this.pageComponentService
            .getRootPageComponentsBySectionId(3)
            .subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  pageData = this.pageComponentUtils.getComponentByCode(
                     this.pageCode
                  );
                  this.page.set(pageData);
               },
               error: (err) =>
                  console.error(
                     `Erreur lors du chargement de ${this.pageCode}`,
                     err
                  ),
            });
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
