import {Component} from '@angular/core';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html'
})
export class LogoutComponent {

   constructor(
      private _authService: AuthService
   ) {
      _authService.logout();
   }

}
