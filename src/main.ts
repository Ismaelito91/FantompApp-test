import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {installPreventZoomHandlers} from './app/utils/prevent-zoom';

installPreventZoomHandlers();

bootstrapApplication(AppComponent, appConfig)
   .catch((err) => console.error(err));
