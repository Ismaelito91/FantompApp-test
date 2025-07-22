import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { Card9Component } from "../../design-system/card-9/card-9.component";
import PageComponentModel from '../../../model/page-component.model';
import { PageComponentService } from '../../../service/page-component.service';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { ComponentType } from '../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ActivatedRoute } from '@angular/router';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';

@Component({
   selector: 'app-view-all',
   imports: [MatIconModule, MatButtonModule, Card9Component, ButtonBackComponent, PageTranslationPipe],
   templateUrl: './view-all.component.html',
   styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly route = inject(ActivatedRoute);

   rootPage = signal<PageComponentModel>({ id: 0, translations: [], childrenIdList: [] });
   page = signal<PageComponentModel | undefined | null>({ id: 0, translations: [], childrenIdList: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;
   targetId = 0;

   ngOnInit(): void {
      console.log(+this.route.snapshot.params['id']);
      this.targetId = +this.route.snapshot.params['id'];
      this.loadRootPage();
      if (!this.pageComponentUtils.getComponentById(this.targetId)) {
         this.loadRootPage();
      }
   }

   private loadRootPage(): void {
      let rootPage = this.pageComponentUtils.getComponentById(this.targetId);
      if (!rootPage) {

         this.pageComponentService.getRootPageComponentsBySectionId(2).subscribe({
            next: (data) => {
               this.pageComponentUtils.updateComponentMap(data);
               this.rootPage.set(this.pageComponentUtils.getComponentById(this.targetId)!);
               this.page.set(this.rootPage());
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
