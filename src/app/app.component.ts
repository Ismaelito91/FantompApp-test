import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SettingService} from "./service/setting.service";

import packageInfo from '../../package.json'


@Component({
   selector: 'app-root',
   standalone: true,
   imports: [
      RouterOutlet,
   ],
   templateUrl: './app.component.html',
   styleUrl: './app.component.scss'
})
export class AppComponent {

   _settingService = inject(SettingService);


   get frontendVersion() {
      return packageInfo.version;
   }

   get backendVersion() {
      return _settingService.settings()?.version;
   }

}
