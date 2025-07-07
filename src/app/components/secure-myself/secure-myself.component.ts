import { Component } from '@angular/core';
import { Card7Component } from "../design-system/card-7/card-7.component";
import { DividerComponent } from "../design-system/divider/divider.component";

@Component({
   selector: 'app-secure-myself',
   imports: [Card7Component, DividerComponent],
   templateUrl: './secure-myself.component.html',
   styleUrl: './secure-myself.component.scss'
})
export class SecureMyselfComponent {

}
