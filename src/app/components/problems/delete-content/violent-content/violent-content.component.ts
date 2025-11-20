import { Component, inject, OnInit, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { ComponentStatus } from "../../../../model/enum/component-status.enum";
import { ComponentType } from "../../../../model/enum/component-type.enum";
import { Device } from "../../../../model/enum/device.enum";
import PageComponentModel from "../../../../model/page-component.model";
import { UtilsService } from "../../../../service/utils.service";
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../../design-system/button/button.component";
import { Card4Component } from "../../../design-system/card-4/card-4.component";
import { Card5Component } from "../../../design-system/card-5/card-5.component";
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { LanguageService } from "../../../../service/language.service";
import { PageComponentUtilsService } from "../../../../service/page-component-utils.service";
import { PageComponentService } from "../../../../service/page-component.service";
import { PageTranslationPipe } from "../../../../pipes/page-translation.pipe";
import { SafeHtmlPipe } from "../../../../pipes/safe-html.pipe";

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
   private readonly languageService = inject(LanguageService);
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

   card_4: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_4,
      status: ComponentStatus.PUBLISHED,
      position: 1,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle:
               "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P1.TITLE",
            description:
               "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P1.DESCRIPTION",
         },
      ],
   };

   card_5_1: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_5,
      status: ComponentStatus.PUBLISHED,
      position: 2,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle:
               "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.TITLE",
            description:
               "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.DESCRIPTION",
         },
      ],
      children: [
         {
            id: 0,
            type: ComponentType.ENRICHED_LINK,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle:
                     "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.LINK.TITLE",
                  description:
                     "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.LINK.DESCRIPTION",
                  staticImage: "assets/images/3018.png",
               },
            ],
         },
         {
            id: 0,
            type: ComponentType.TILE_CALL,
            status: ComponentStatus.PUBLISHED,
            position: 2,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle:
                     "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.CALL.TITLE",
                  staticImage: "assets/images/3018.png",
               },
            ],
         },
      ],
   };

   card_5_2: PageComponentModel = {
      id: 0,
      type: ComponentType.CARD_5,
      status: ComponentStatus.PUBLISHED,
      position: 3,
      translations: [
         {
            id: 0,
            countryRegion: this.languageService.language(),
            devices: [Device.ANDROID, Device.IOS, Device.WEB],
            firstTitle:
               "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.TITLE",
            description:
               "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.DESCRIPTION",
         },
      ],
      children: [
         {
            id: 0,
            type: ComponentType.ENRICHED_LINK,
            status: ComponentStatus.PUBLISHED,
            position: 1,
            translations: [
               {
                  id: 0,
                  countryRegion: this.languageService.language(),
                  devices: [Device.ANDROID, Device.IOS, Device.WEB],
                  firstTitle:
                     "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.LINK.TITLE",
                  description:
                     "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.LINK.DESCRIPTION",
                  staticImage: "assets/images/mariane.png",
               },
            ],
         },
      ],
   };

   ngOnInit(): void {
      const state = history.state as { reported: boolean };
      this.reported = state.reported;

      this.loadRootPage();
   }

   private loadRootPage(): void {
      let pageResources = this.pageComponentUtils.getComponentByCode(PAGE_CODE);
      this.page.set(pageResources);
      if (!pageResources) {
         this.pageComponentService
            .getRootPageComponentsBySectionId(3)
            .subscribe({
               next: (data) => {
                  this.pageComponentUtils.updateComponentMap(data);
                  pageResources = this.pageComponentUtils.getComponentByCode(PAGE_CODE);
                  this.page.set(pageResources);
               },
               error: (err) => console.error("Erreur lors du chargement de home", err),
            });
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
