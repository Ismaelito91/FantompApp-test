import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
   selector: 'app-stepper',
   imports: [TranslatePipe],
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
