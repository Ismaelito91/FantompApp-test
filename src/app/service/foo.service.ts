import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import Foo from "../model/foo.model";
import PageResultModel from "../model/page-result.model";

@Injectable({
   providedIn: 'root'
})
export class FooService {

   constructor(
      private _http: HttpClient
   ) { }
   
   find(foo_id: number) {
      let params = new HttpParams()
         .set("foo_id", foo_id);
      
      return this._http.get<Foo>("/api/foo", { params });
   }

   findAll(page: number, limit: number, filter?: string) {
      let params = new HttpParams()
         .set('page', page)
         .set('limit', limit);
      
      if (filter) {
         params = params.set('filter', filter);
      }
      
      return this._http.get<PageResultModel<Foo[]>>("/api/foo/all", { params });
   }

}
