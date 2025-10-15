import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ComponentType } from '../../../model/enum/component-type.enum';
import PageComponentModel from '../../../model/page-component.model';
import { PageTranslationPipe } from '../../../pipes/page-translation.pipe';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
import { PageComponentService } from '../../../service/page-component.service';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { Card9Component } from "../../design-system/card-9/card-9.component";
import { ButtonComponent } from '../../design-system/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
   selector: 'app-view-all',
   imports: [MatIconModule, MatButtonModule, Card9Component, ButtonBackComponent, PageTranslationPipe, TranslatePipe, SafeHtmlPipe],
   templateUrl: './view-all.component.html',
   styleUrl: './view-all.component.scss'
})
export class ViewAllComponent {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly route = inject(ActivatedRoute);
   readonly dialog = inject(MatDialog);

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
      if (localStorage.getItem('social-media-tutorial') !== 'true') {
         this.openDialog();
      }
   }

   private loadRootPage(): void {
      let rootPage = this.pageComponentUtils.getComponentById(this.targetId);
      
      if (!rootPage || sessionStorage.getItem('overrideDevice')) {

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

   openDialog() {
      const dialogRef = this.dialog.open(TutorialDialog, {
         backdropClass: 'blurred-backdrop'
      });

      dialogRef.afterClosed().subscribe(() => {
         localStorage.setItem('social-media-tutorial', 'true');
      });
   }
}

@Component({
   selector: 'tutorial-dialog',
   templateUrl: 'tutorial-dialog.component.html',
   imports: [MatDialogContent, MatDialogClose, MatButtonModule, ButtonComponent, TranslatePipe],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialDialog { }
