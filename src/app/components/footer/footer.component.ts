import { Component } from '@angular/core';
import { SettingService } from "../../service/setting.service";
import packageInfo from '../../../../package.json';

@Component({
   selector: 'app-footer',
   standalone: true,
   imports: [],
   templateUrl: './footer.component.html'
})
export class FooterComponent {

   constructor(
      private _settingService: SettingService
   ) { }

   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return this._settingService.settings()?.version;
   }

}
