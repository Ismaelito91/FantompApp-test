import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { SwiperContainer } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { ComponentStatus } from '../../../../model/enum/component-status.enum';
import { ComponentType } from '../../../../model/enum/component-type.enum';
import PageComponentModel from '../../../../model/page-component.model';
import { PageTranslationPipe } from '../../../../pipes/page-translation.pipe';
import { PageComponentUtilsService } from '../../../../service/page-component-utils.service';
import { PageComponentService } from '../../../../service/page-component.service';
import { ButtonBackComponent } from '../../../design-system/button-back/button-back.component';
import { Card18Component } from '../../../design-system/card-18/card-18.component';

@Component({
   selector: 'app-actions',
   imports: [MatIconModule, MatButtonModule, ButtonBackComponent, PageTranslationPipe, Card18Component],
   templateUrl: './actions.component.html',
   styleUrl: './actions.component.scss',
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
   encapsulation: ViewEncapsulation.None,
})
export class ActionsComponent {
   private readonly pageComponentService = inject(PageComponentService);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly route = inject(ActivatedRoute);

   rootPage = signal<PageComponentModel>({ id: 0, translations: [], childrenIdList: [] });
   page = signal<PageComponentModel | undefined | null>({ id: 0, translations: [], childrenIdList: [] });
   ComponentType = ComponentType;
   ComponentStatus = ComponentStatus;
   targetId = 0;
   @ViewChild('swiper', { static: true }) swiperEl?: ElementRef<SwiperContainer>;

   private pendingFocusDirection: 'prev' | 'next' | null = null;

   ngOnInit(): void {
      this.targetId = +this.route.snapshot.params['id'];
      if (this.targetId === 0) {
         const page = history.state as PageComponentModel;
         this.page.set(page)
      } else {
         this.loadRootPage();
      }
   }

   ngAfterViewInit(): void {
      this.injectPaginationStylesIntoShadowDom();
      this.bindSwiperFocusEvents();
   }

   private injectPaginationStylesIntoShadowDom(): void {
      const host = this.swiperEl?.nativeElement as any;
      const shadow: ShadowRoot | undefined = host?.shadowRoot as ShadowRoot | undefined;
      if (!shadow || !('adoptedStyleSheets' in shadow)) {
         // Fallback: si le shadowRoot n'est pas encore prêt, on réessaie après init Swiper
         try {
            host?.addEventListener('afterinit', () => this.injectPaginationStylesIntoShadowDom(), { once: true });
         } catch { }
         return;
      }
      let childrenNumber = this.sortedChildren.length;
      let width = childrenNumber * 20;
      if (width === 0) {
         width = 5 * 20;
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

   private bindSwiperFocusEvents(): void {
      const host = this.swiperEl?.nativeElement as any;
      const register = () => {
         try {
            const instance: Swiper | undefined = host?.swiper as Swiper | undefined;
            instance?.on('slideChangeTransitionEnd', () => this.applyPendingFocus());
         } catch { }
      };
      if (host?.swiper) {
         register();
      } else {
         try {
            host?.addEventListener('afterinit', register, { once: true });
         } catch { }
      }
   }

   private applyPendingFocus(): void {
      const direction = this.pendingFocusDirection;
      this.pendingFocusDirection = null;
      if (!direction) return;
      setTimeout(() => this.focusArrowButton(direction), 0);
   }

   private focusArrowButton(direction: 'prev' | 'next'): void {
      const host = this.swiperEl?.nativeElement as HTMLElement | undefined;
      if (!host) return;
      const activeSlide = host.querySelector('swiper-slide.swiper-slide-active') as HTMLElement | null;
      if (!activeSlide) return;
      const selector = direction === 'prev' ? 'button[aria-label="Previous"]' : 'button[aria-label="Next"]';
      const btn = activeSlide.querySelector(selector) as HTMLButtonElement | null;
      btn?.focus();
   }

   onkeydown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
         this.swiperEl?.nativeElement.swiper.slidePrev();
      } else if (event.key === 'ArrowRight') {
         this.swiperEl?.nativeElement.swiper.slideNext();
      }
   }

   arrowNext() {
      this.pendingFocusDirection = 'next';
      this.swiperEl?.nativeElement?.swiper?.slideNext();
   }

   arrowPrev() {
      this.pendingFocusDirection = 'prev';
      this.swiperEl?.nativeElement?.swiper?.slidePrev();
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
