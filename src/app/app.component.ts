import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingService } from "./service/setting.service";

import packageInfo from '../../package.json';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
   selector: 'app-root',
   standalone: true,
   imports: [
      RouterOutlet,
      HeaderComponent,
      FooterComponent
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
      return this._settingService.settings()?.version;
   }

}
