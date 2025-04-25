import { Routes } from '@angular/router';
import { ErrorComponent } from "./components/common/error/error.component";
import { HomeComponent } from "./components/home/home.component";


export const routes: Routes = [
   {
      path: '',
      component: HomeComponent
   },
   {
      path: 'error/:code',
      component: ErrorComponent
   },
   {
      path: '**',
      redirectTo: '/error/404', pathMatch: 'full',
   },
];
