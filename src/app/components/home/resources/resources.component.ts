import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
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
   imports: [Card3Component, Card4Component, Card5Component, Card6Component, Card14Component, DividerComponent, ButtonBackComponent, PageTranslationPipe, TranslatePipe, SafeHtmlPipe],
   templateUrl: './resources.component.html',
   styleUrl: './resources.component.scss'
})
export class ResourcesComponent {
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly pageComponentService = inject(PageComponentService);
   page = signal<PageComponentModel | null>({ id: 0, translations: [], childrenIdList: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   ngOnInit(): void {
      this.loadRootPage();
   }

   private loadRootPage(): void {
      let pageResources = this.pageComponentUtils.getComponentByCode('2.7_ressources');
      this.page.set(pageResources);
      if (!pageResources) {
         this.pageComponentService.getRootPageComponentsBySectionId(3).subscribe({
            next: (data) => {
               this.pageComponentUtils.updateComponentMap(data);
               pageResources = this.pageComponentUtils.getComponentByCode('2.7_ressources');
               this.page.set(pageResources);
            },
            error: (err) => console.error('Erreur lors du chargement de home', err)
         });
      }
   }

   get sortedChildren() {
      return this.pageComponentUtils.getSortedChildren(this.page());
   }
}
