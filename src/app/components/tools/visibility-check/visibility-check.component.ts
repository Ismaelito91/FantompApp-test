import { Component } from '@angular/core';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { MatRadioButton } from "@angular/material/radio";

@Component({
  selector: 'app-visibility-check',
  imports: [ButtonBackComponent, MatRadioButton],
  templateUrl: './visibility-check.component.html',
  styleUrl: './visibility-check.component.scss'
})
export class VisibilityCheckComponent {

}
