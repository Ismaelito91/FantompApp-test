import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../design-system/button/button.component";
import { StepperComponent } from '../../design-system/stepper/stepper.component';

type Question = {
   image?: string,
   title: string,
   sections: Section[]
}
type Section = {
   name: string,
   title?: string,
   answers: Answer[]
}
type Answer = {
   title: string,
   description?: string,
   value?: boolean
}

@Component({
   selector: 'app-hacking',
   imports: [ButtonBackComponent, ButtonComponent, MatRadioModule, ReactiveFormsModule, TranslatePipe, StepperComponent],
   templateUrl: './hacking.component.html',
   styleUrl: './hacking.component.scss'
})
export class HackingComponent {
   private readonly router = inject(Router);
   currentStep = 1;
   totalSteps = 1;
   questions: Question[] = [
      {
         title: 'PROBLEMS.HACKING.SITUATION.TITLE',
         sections: [
            {
               name: 'have_access',
               answers: [
                  {
                     title: 'PROBLEMS.HACKING.SITUATION.NONE.ANSWERS.ANSWER_1_TITLE',
                     value: true
                  },
                  {
                     title: 'PROBLEMS.HACKING.SITUATION.NONE.ANSWERS.ANSWER_2_TITLE',
                     value: false
                  },
               ]
            },
         ]
      }
   ]
   currentQuestion = this.questions[this.currentStep - 1]
   formGroup = new FormGroup({
      have_access: new FormControl(),
   });

   onClickResults() {
      const have_access = this.formGroup.value.have_access;

      if (have_access) {
         this.router.navigate(['hacking', 'have-access']);
      } else {
         this.router.navigate(['hacking', 'no-access']);
      }
   }
}
