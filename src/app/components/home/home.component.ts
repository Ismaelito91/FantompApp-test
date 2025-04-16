import { Component } from '@angular/core';

import { AuthService } from "../../service/auth.service";
import { JsonPipe } from "@angular/common";


@Component({
   selector: 'app-home',
   standalone: true,
   imports: [
      JsonPipe,
   ],
   templateUrl: './home.component.html'
})
export class HomeComponent {

   get user() {
      return this._authService.user;
   }


   constructor(

      private _authService: AuthService,
   ) { }
}
