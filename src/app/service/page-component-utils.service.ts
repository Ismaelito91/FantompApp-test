import { Injectable } from '@angular/core';
import PageComponentModel from '../model/page-component.model';
import { ComponentType } from '../model/enum/component-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PageComponentUtilsService {

  private readonly componentMap = new Map<number, PageComponentModel>();

  updateComponentMap(data: Record<string, PageComponentModel>) {
    for (const [key, value] of Object.entries(data)) {
      this.componentMap.set(parseInt(key), value as PageComponentModel);
    }
  }

  findRootPage(sectionId:number): PageComponentModel | null {
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
       }
    }
    return null;
 }

  getComponentById(id: number): PageComponentModel | null {
    return this.componentMap.get(id) ?? null;
  }

  /**
   * Trie les enfants d'un composant par position
   * @param component Le composant dont on veut trier les enfants
   * @returns Les enfants triés par position
   */
  getSortedChildren(component: PageComponentModel | null | undefined): PageComponentModel[] {
    const childrenIdList = component?.childrenIdList ?? [];
    return childrenIdList
      .map(id => this.componentMap.get(id))
      .filter((child): child is PageComponentModel => child !== undefined);
  }
} 