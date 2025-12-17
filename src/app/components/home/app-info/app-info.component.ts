import { Component, OnInit, inject, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ComponentStatus } from "../../../model/enum/component-status.enum";
import { ComponentType } from "../../../model/enum/component-type.enum";
import PageComponentModel from "../../../model/page-component.model";
import { PageTranslationPipe } from "../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../pipes/safe-html.pipe";
import { PageComponentUtilsService } from "../../../service/page-component-utils.service";
import { PageComponentService } from "../../../service/page-component.service";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";

const PAGE_CODE = "2.5_cest-quoi-cette-app";

@Component({
   selector: "app-app-info",
   imports: [
      ButtonBackComponent,
      TranslatePipe,
      PageTranslationPipe,
      SafeHtmlPipe,
   ],
   templateUrl: "./app-info.component.html",
   styleUrl: "./app-info.component.scss",
})
export class AppInfoComponent implements OnInit {
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
      let pageAppInfo = this.pageComponentUtils.getComponentByCode(PAGE_CODE);
      this.page.set(pageAppInfo);
      if (!pageAppInfo) {
         this.pageComponentService
            .getRootPageComponentsBySectionId(3)
            .subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  pageAppInfo =
                     this.pageComponentUtils.getComponentByCode(PAGE_CODE);
                  this.page.set(pageAppInfo);
               },
               error: (err) =>
                  console.error("Erreur lors du chargement de app-info", err),
            });
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
