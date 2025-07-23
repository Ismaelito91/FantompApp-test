import { Component } from '@angular/core';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { MatRadioButton } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { StepperComponent } from "../../design-system/stepper/stepper.component";

@Component({
   selector: 'app-visibility-check',
   imports: [ButtonBackComponent, MatRadioButton, MatButtonModule, StepperComponent],
   templateUrl: './visibility-check.component.html',
   styleUrl: './visibility-check.component.scss'
})
export class VisibilityCheckComponent {
   currentStep = 1;
   totalSteps = 2;

   get steps(): number[] {
      return Array.from({ length: this.totalSteps }, (_, i) => i + 1);
   }
   onClickNext() {
      this.currentStep++;
   }

   onClickPrevious() {
      this.currentStep--;
   }

   onClickResults() {
      console.log('Results');
   }
}
