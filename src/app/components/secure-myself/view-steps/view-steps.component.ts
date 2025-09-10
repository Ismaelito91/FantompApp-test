import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild, AfterViewInit, inject, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import PageComponentModel from '../../../model/page-component.model';
import { ComponentType } from '../../../model/enum/component-type.enum';
import { ComponentStatus } from '../../../model/enum/component-status.enum';
import { ActivatedRoute } from '@angular/router';
import { PageComponentService } from '../../../service/page-component.service';
import { PageComponentUtilsService } from '../../../service/page-component-utils.service';
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
export class ViewStepsComponent implements AfterViewInit {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly route = inject(ActivatedRoute);

   rootPage = signal<PageComponentModel>({ id: 0, translations: [], childrenIdList: [] });
   page = signal<PageComponentModel | undefined | null>({ id: 0, translations: [], childrenIdList: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;
   targetId = 0;
   @ViewChild('swiper', { static: true }) swiperEl?: ElementRef<SwiperContainer>;

   ngOnInit(): void {
      console.log(+this.route.snapshot.params['id']);
      this.targetId = +this.route.snapshot.params['id'];
      this.loadRootPage();
   }

   ngAfterViewInit(): void {
      this.injectPaginationStylesIntoShadowDom();
   }

   private injectPaginationStylesIntoShadowDom(): void {
      const host = this.swiperEl?.nativeElement as any;
      const shadow: ShadowRoot | undefined = host?.shadowRoot as ShadowRoot | undefined;
      if (!shadow || !('adoptedStyleSheets' in shadow)) {
         // Fallback: si le shadowRoot n'est pas encore prêt, on réessaie après init Swiper
         try {
            host?.addEventListener('afterinit', () => this.injectPaginationStylesIntoShadowDom(), { once: true });
         } catch {}
         return;
      }
      let childrenNumber = this.sortedChildren.length;
      let width = childrenNumber*20;
      if (width === 0) {
         width = 5*20;
      }
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(`
         .swiper-pagination {
            width: ${width}px !important;
         }
      `);

      const sheets = Array.from(shadow.adoptedStyleSheets || []);
      shadow.adoptedStyleSheets = [...sheets, sheet];
   }

   onkeydown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
         this.swiperEl?.nativeElement.swiper.slidePrev();
      } else if (event.key === 'ArrowRight') {
         this.swiperEl?.nativeElement.swiper.slideNext();
      } else if (event.key === 'Enter' || event.key === ' ') {
         // let targetElement = event.target as HTMLElement;
         // let index = Array.prototype.indexOf.call(targetElement.parentNode?.children, targetElement);
         // this.swiperEl?.nativeElement.swiper.slideTo(index);
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
