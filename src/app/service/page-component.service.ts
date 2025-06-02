import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import PageComponentModel from "../model/page-component.model";

@Injectable({
   providedIn: 'root'
})
export class PageComponentService {

   private readonly _http = inject(HttpClient);

   getPageComponentsBySectionId(sectionId: number) {
      return this._http.get<PageComponentModel[]>(`api/public/page-components/${sectionId}`);
   }
}
