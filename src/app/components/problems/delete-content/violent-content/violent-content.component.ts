import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import { Device } from '../../../../model/enum/device.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { UtilsService } from '../../../../service/utils.service';
import { ButtonBackComponent } from "../../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../../design-system/button/button.component";
import { Card4Component } from "../../../design-system/card-4/card-4.component";
import { Card5Component } from "../../../design-system/card-5/card-5.component";
import { DividerComponent } from "../../../design-system/divider/divider.component";
import { LanguageService } from '../../../../service/language.service';

@Component({
   selector: 'app-violent-content',
   imports: [ButtonBackComponent, TranslatePipe, DividerComponent, Card4Component, Card5Component, ButtonComponent],
   templateUrl: './violent-content.component.html',
   styleUrl: './violent-content.component.scss'
})
export class ViolentContentComponent {
   readonly utilsService = inject(UtilsService);
   private readonly languageService = inject(LanguageService);
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
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P1.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P1.DESCRIPTION",
         }
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
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.DESCRIPTION",
         }
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
                  firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.LINK.TITLE",
                  description: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.LINK.DESCRIPTION",
                  staticImage: "assets/images/3018.png"
               }
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
                  firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P2.CALL.TITLE",
                  staticImage: "assets/images/3018.png"
               }
            ],
         }
      ]
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
            firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.TITLE",
            description: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.DESCRIPTION",
         }
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
                  firstTitle: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.LINK.TITLE",
                  description: "PROBLEMS.DELETE_CONTENT.RESULTS.VIOLENT_CONTENT.P3.LINK.DESCRIPTION",
                  staticImage: "assets/images/mariane.png"
               }
            ],
         }
      ]
   };

   constructor() {
      const state = history.state as { reported: boolean };
      this.reported = state.reported;
   }
}
