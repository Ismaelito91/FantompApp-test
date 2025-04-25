import { Component, input, OnInit, signal } from '@angular/core';
import ApiErrorModel from "../../../model/api-error.model";
import { JsonPipe } from "@angular/common";

@Component({
   selector: 'app-error',
   standalone: true,
   imports: [
      JsonPipe
   ],
   templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {

   code = input<number>();
   error = signal<ApiErrorModel>(history.state?.error);

   ngOnInit(): void {
      console.log(this.error());
   }

}
