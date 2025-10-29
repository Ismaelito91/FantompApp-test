import { inject, Injectable, Injector } from "@angular/core";
import { Device } from "../model/enum/device.enum";
import { PageComponentService } from "./page-component.service";
import { PageComponentUtilsService } from "./page-component-utils.service";

import { Platform } from "@angular/cdk/platform";

@Injectable({ providedIn: 'root' })
export class DeviceService {
   private overrideDevice: Device | null = null;
   private readonly storageKey = 'overrideDevice';
   private readonly injector = inject(Injector);
   private readonly pageComponentUtils = inject(PageComponentUtilsService);
   private readonly platform = inject(Platform);

   setOverride(device: string | null | undefined) {
      const upper = (device || '').toUpperCase();
      if (upper === Device.WEB || upper === Device.ANDROID || upper === Device.IOS) {
         sessionStorage.setItem(this.storageKey,upper);
         this.overrideDevice = upper as Device;
         this.updatePageServiceWithDevice(this.overrideDevice);
      } else {
         this.overrideDevice = null;
      }
   }

   getDevicesHeader(): Device[] {
      if (this.overrideDevice) {
         return [this.overrideDevice];
      } else if(sessionStorage.getItem(this.storageKey)){
         return [sessionStorage.getItem(this.storageKey) as Device];
      }
      const devicesHeader: Device[] = [];
      if (this.platform.isBrowser) devicesHeader.push(Device.WEB);
      if (this.platform.ANDROID) devicesHeader.push(Device.ANDROID);
      if (this.platform.IOS) devicesHeader.push(Device.IOS);
      return devicesHeader;
   }

   updatePageServiceWithDevice(device: Device) {
      const pageComponentService = this.injector.get(PageComponentService);
      pageComponentService.getRootPageComponentsBySectionId(2).subscribe({
         next: (data) => {
            this.pageComponentUtils.updateComponentMap(data);
         },
      });
   }
}


