import { Component, input } from '@angular/core';

@Component({
   selector: 'app-stepper',
   imports: [],
   templateUrl: './stepper.component.html',
   styleUrl: './stepper.component.scss'
})
export class StepperComponent {
   currentStep = input.required<number>();
   totalSteps = input.required<number>();

   get steps(): number[] {
      return Array.from({ length: this.totalSteps() }, (_, i) => i + 1);
   }
}
