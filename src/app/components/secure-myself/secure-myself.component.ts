import { Component, inject, OnInit, signal } from '@angular/core';
import { Card7Component } from "../design-system/card-7/card-7.component";
import { DividerComponent } from "../design-system/divider/divider.component";
import { PageComponentService } from '../../service/page-component.service';
import PageComponentModel from '../../model/page-component.model';
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";
import { ComponentType } from '../../model/enum/component-type.enum';
import { ComponentStatus } from '../../model/enum/component-status.enum';

@Component({
   selector: 'app-secure-myself',
   imports: [Card7Component, DividerComponent, SafeHtmlPipe, DividerComponent, Card7Component],
   templateUrl: './secure-myself.component.html',
   styleUrl: './secure-myself.component.scss'
})
export class SecureMyselfComponent implements OnInit {
   private readonly pageComponentService = inject(PageComponentService);

   rootPage = signal<PageComponentModel>({ id: 0, translations: [], children: [] });
   page = signal<PageComponentModel | null>({ id: 0, translations: [], children: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;

   ngOnInit(): void {
      this.loadRootPage();
   }

   private loadRootPage(): void {
      this.pageComponentService.getRootPageComponentsBySectionId(2).subscribe({
         next: (data) => {
            this.rootPage.set(data);
            this.page.set(data);
         },
         error: (err) => console.error('Erreur lors du chargement des problèmes', err)
      });
   }

   get sortedChildren() {
      const children = this.page()?.children ?? [];
      return [...children].sort((a, b) => a.position! - b.position!);
   }
}
