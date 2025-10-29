import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import PageComponentModel from '../model/page-component.model';
import { ComponentType } from '../model/enum/component-type.enum';

@Injectable({
   providedIn: 'root'
})
export class PageComponentUtilsService {

   private readonly componentMap = new Map<number, PageComponentModel>();
   private readonly componentMapUpdated$ = new Subject<void>();

   // Observable pour que les composants puissent s'abonner aux changements
   get onComponentMapUpdated$() {
      return this.componentMapUpdated$.asObservable();
   }

   updateComponentMap(data: Record<string, PageComponentModel>) {
      for (const [key, value] of Object.entries(data)) {
         this.componentMap.set(parseInt(key), value as PageComponentModel);
      }
      // Notifier tous les composants que la map a été mise à jour
      this.componentMapUpdated$.next();
   }

   findRootPage(sectionId: number): PageComponentModel | null {
      if (!this.componentMap || this.componentMap.size === 0) {
         return null;
      }
      for (const [, value] of this.componentMap.entries()) {
         if (1 === sectionId) {
            if (value.type === ComponentType.PAGE_1) {
               return value;
            }
         } else if (2 === sectionId) {
            if (value.type === ComponentType.PAGE_3) {
               return value;
            }
         } else if (3 === sectionId) {
            if (value.type === ComponentType.PAGE_RESOURCES) {
               return value;
            }
         }
      }
      return null;
   }

   getComponentById(id: number): PageComponentModel | null {
      return this.componentMap.get(id) ?? null;
   }

   getComponentByCode(code: string): PageComponentModel | null {
      for (const component of this.componentMap.values()) {
         if (component.code === code) {
            return component;
         }
      }
      return null;
   }

   /**
    * Trie les enfants d'un composant par position
    * @param component Le composant dont on veut trier les enfants
    * @returns Les enfants triés par position
    */
   getSortedChildren(component: PageComponentModel | null | undefined): PageComponentModel[] {
      if (component?.id) { // Si le composant a une id (!= 0) on se base sur childrenIdList (api) sinon sur le children (statique)
         const childrenIdList = component?.childrenIdList ?? [];
         return childrenIdList
            .map(id => this.componentMap.get(id))
            .filter((child): child is PageComponentModel => child !== undefined);
      } else {
         const children = component?.children ?? [];
         return [...children].sort((a, b) => a.position! - b.position!);
      }
   }
} 
