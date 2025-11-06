import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import PageComponentModel from "../model/page-component.model";
import { Device } from "../model/enum/device.enum";
import { DeviceService } from "./device.service";

@Injectable({
   providedIn: 'root'
})
export class PageComponentService {

   private readonly _http = inject(HttpClient);
   private readonly deviceService = inject(DeviceService);

   getRootPageComponentsBySectionId(sectionId: number) {
      let devicesHeader: Device[];
      let url = `api/public/page-components/section/${sectionId}/root`;

      const override = sessionStorage.getItem('overrideDevice');
      if (override === Device.WEB || override === Device.ANDROID || override === Device.IOS) {
         devicesHeader = [override as Device];
         url += `?device=${encodeURIComponent(override)}`; // ajout du device pour forcer le service worker à ne pas utiliser le cache
      } else {
         devicesHeader = this.deviceService.getDevicesHeader();
      }

      return this._http.get<Record<string, PageComponentModel>>(
         url,
         { headers: { 'X-Devices': devicesHeader } }
      );
   }

   getHomePageLinkIds() {
      return this._http.get<Record<string, number>>(`api/public/page-components/home-page-link-ids`);
   }
}
