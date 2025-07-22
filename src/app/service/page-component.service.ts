import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import PageComponentModel from "../model/page-component.model";
import { Platform } from "@angular/cdk/platform";
import { Device } from "../model/enum/device.enum";

@Injectable({
   providedIn: 'root'
})
export class PageComponentService {

   private readonly _http = inject(HttpClient);
   private readonly platform = inject(Platform);

   getRootPageComponentsBySectionId(sectionId: number) {
      const devicesHeader: Device[] = [];
      if (this.platform.isBrowser) {
         devicesHeader.push(Device.WEB);
      }
      if (this.platform.ANDROID) {
         devicesHeader.push(Device.ANDROID);
      }
      if (this.platform.IOS) {
         devicesHeader.push(Device.IOS);
      }
     
      return this._http.get<Record<string, PageComponentModel>>(`api/public/page-components/section/${sectionId}/root`,
         { headers: { 'X-Devices': devicesHeader } });
   }

   getHomePageLinkIds() {
      return this._http.get<Record<string, number>>(`api/public/page-components/home-page-link-ids`);
   }
}
