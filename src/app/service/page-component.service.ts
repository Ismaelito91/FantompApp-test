import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import PageComponentModel from "../model/page-component.model";
import { Platform } from "@angular/cdk/platform";
import { Device } from "../model/enum/device.enum";
import { DeviceService } from "./device.service";

@Injectable({
   providedIn: 'root'
})
export class PageComponentService {

   private readonly _http = inject(HttpClient);
   private readonly platform = inject(Platform);
   private readonly deviceService = inject(DeviceService);

   getRootPageComponentsBySectionId(sectionId: number) {
      let devicesHeader: Device[];

      const override = sessionStorage.getItem('overrideDevice');
      if (override === Device.WEB || override === Device.ANDROID || override === Device.IOS) {
         devicesHeader = [override as Device];
      } else {
         devicesHeader = this.deviceService.getDevicesHeader(this.platform);
      }

      return this._http.get<Record<string, PageComponentModel>>(
         `api/public/page-components/section/${sectionId}/root`,
         { headers: { 'X-Devices': devicesHeader } }
      );
   }

   getHomePageLinkIds() {
      return this._http.get<Record<string, number>>(`api/public/page-components/home-page-link-ids`);
   }
}
