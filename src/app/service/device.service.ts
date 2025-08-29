import { Injectable } from "@angular/core";
import { Device } from "../model/enum/device.enum";

@Injectable({ providedIn: 'root' })
export class DeviceService {
   private overrideDevice: Device | null = null;

   setOverride(device: string | null | undefined) {
      const upper = (device || '').toUpperCase();
      if (upper === Device.WEB || upper === Device.ANDROID || upper === Device.IOS) {
         this.overrideDevice = upper as Device;
      } else {
         this.overrideDevice = null;
      }
   }

   getDevicesHeader(platform: { isBrowser: boolean; ANDROID: boolean; IOS: boolean; }): Device[] {
      if (this.overrideDevice) {
         return [this.overrideDevice];
      }
      const devicesHeader: Device[] = [];
      if (platform.isBrowser) devicesHeader.push(Device.WEB);
      if (platform.ANDROID) devicesHeader.push(Device.ANDROID);
      if (platform.IOS) devicesHeader.push(Device.IOS);
      return devicesHeader;
   }
}


