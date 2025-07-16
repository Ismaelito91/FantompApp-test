import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { Card9Component } from "../../design-system/card-9/card-9.component";
import PageComponentModel from '../../../model/page-component.model';
import { PageComponentService } from '../../../service/page-component.service';
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
