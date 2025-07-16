import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import PageComponentModel from '../../../model/page-component.model';
import { ComponentType } from '../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ActivatedRoute } from '@angular/router';
import { PageComponentService } from '../../../service/page-component.service';
import { Card11Component } from "../../design-system/card-11/card-11.component";
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';

register();

@Component({
   selector: 'app-view-steps',
   imports: [MatIconModule, MatButtonModule, ButtonBackComponent, Card11Component, PageTranslationPipe],
   templateUrl: './view-steps.component.html',
   styleUrl: './view-steps.component.scss',
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   encapsulation: ViewEncapsulation.None,
})
export class ViewStepsComponent {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly route = inject(ActivatedRoute);

   rootPage = signal<PageComponentModel>({ id: 0, translations: [], children: [] });
   page = signal<PageComponentModel | undefined | null>({ id: 0, translations: [], children: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;
   targetId = 0;

   ngOnInit(): void {
      this.loadRootPage();
      console.log(+this.route.snapshot.params['id']);
      this.targetId = +this.route.snapshot.params['id'];
   }

   private loadRootPage(): void {
      this.pageComponentService.getRootPageComponentsBySectionId(2).subscribe({
         next: (data) => {
            this.rootPage.set(data);
            this.page.set(this.findNodeById(this.rootPage()));
         },
         error: (err) => console.error('Erreur lors du chargement des problèmes', err)
      });
   }

   get sortedChildren() {
      const children = this.page()?.children ?? [];
      return [...children].sort((a, b) => a.position! - b.position!);
   }

   findNodeById(tree: PageComponentModel): PageComponentModel | undefined | null {
      if (tree.next && tree.next.id === this.targetId) {
         return tree.next;
      }

      if (tree.children?.length) {
         for (const child of tree.children) {
            const found = this.findNodeById(child);
            if (found) {
               console.log('found', found);
               return found;
            };
         }
      }

      return null;
   }
}
