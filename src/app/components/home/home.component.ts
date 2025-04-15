import {Component} from '@angular/core';

import {AuthService} from "../../service/auth.service";
import {JsonPipe} from "@angular/common";

import {FooListComponent} from "./foo-list/foo-list.component";
import {FooService} from "../../service/foo.service";

@Component({
   selector: 'app-home',
   standalone: true,
   imports: [
      JsonPipe,
      FooListComponent
   ],
   templateUrl: './home.component.html'
})
export class HomeComponent {

   get user() {
      return this._authService.user;
   }


   constructor(

      private _authService: AuthService,

      private _fooService: FooService
   ) { }
}
