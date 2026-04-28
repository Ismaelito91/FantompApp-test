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
import { Card19Component } from "../../../design-system/card-19/card-19.component";
import { TranslatePipe } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../../../pipes/safe-html.pipe';

@Component({
   selector: 'app-actions',
   imports: [TranslatePipe, MatIconModule, MatButtonModule, ButtonBackComponent, PageTranslationPipe, Card18Component, Card19Component, SafeHtmlPipe],
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
   initialSlide: number = 0;
   @ViewChild('swiper', { static: true }) swiperEl?: ElementRef<SwiperContainer>;

   private pendingFocusDirection: 'prev' | 'next' | null = null;

   ngOnInit(): void {
      this.targetId = +this.route.snapshot.params['id'];
      if (this.targetId === 0) {
         const state = history.state as { page: PageComponentModel, index: number };
         this.page.set(state.page)
         this.initialSlide = state.index;
      } else {
         this.loadRootPage();
      }
   }

   ngAfterViewInit(): void {
      const swiperEl = this.swiperEl?.nativeElement as any;

      if (swiperEl) {
         Object.assign(swiperEl, {
            slidesPerView: 1,
            initialSlide: this.initialSlide,
            pagination: { clickable: false },
         });

         swiperEl.initialize();
      }
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
            instance?.on('slideChangeTransitionEnd', () => {
               this.syncSlidesState();
               this.applyPendingFocus();
            });
            instance?.on('slidesUpdated', () => this.syncSlidesState());
            instance?.on('slidesLengthChange', () => this.syncSlidesState());
            this.syncSlidesState();
            this.focusActiveSlide(10);
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

    // empêche les lecteurs d'écran d'atteindre les slides non visibles.
    
   private syncSlidesState(): void {
      const host = this.swiperEl?.nativeElement as any;
      const activeIndex: number = host?.swiper?.activeIndex ?? 0;
      const slides = host?.querySelectorAll?.('swiper-slide') as
         | NodeListOf<HTMLElement>
         | undefined;
      slides?.forEach((slide, i) => {
         const hidden = i !== activeIndex;
         if (hidden) {
            slide.setAttribute('aria-hidden', 'true');
            slide.setAttribute('inert', '');
         } else {
            slide.removeAttribute('aria-hidden');
            slide.removeAttribute('inert');
         }
      });
   }

   private applyPendingFocus(): void {
      const direction = this.pendingFocusDirection;
      this.pendingFocusDirection = null;
      if (!direction) return;
      setTimeout(() => this.focusActiveSlide(), 0);
   }

   private focusActiveSlide(retry = 0): void {
      const host = this.swiperEl?.nativeElement as HTMLElement | undefined;
      if (!host) return;
      const activeSlide = host.querySelector('swiper-slide.swiper-slide-active') as HTMLElement | null;
      const target = (activeSlide?.querySelector('div.card-swiper-container') as HTMLElement | null) ?? activeSlide;
      if (!target) {
         if (retry > 0) {
            setTimeout(() => this.focusActiveSlide(retry - 1), 100);
         }
         return;
      }

      if (!target.hasAttribute('tabindex')) {
         target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
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
