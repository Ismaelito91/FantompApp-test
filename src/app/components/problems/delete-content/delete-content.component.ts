import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonBackComponent } from '../../design-system/button-back/button-back.component';
import { StepperComponent } from '../../design-system/stepper/stepper.component';
import { ButtonComponent } from "../../design-system/button/button.component";


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
type Results = {
   pseudo: string[],
   bio: string[]
}

@Component({
   selector: 'app-delete-content',
   imports: [TranslatePipe, ButtonBackComponent, MatRadioModule, MatButtonModule,
      StepperComponent, MatIconModule, ReactiveFormsModule, ButtonComponent],
   templateUrl: './delete-content.component.html',
   styleUrl: './delete-content.component.scss'
})
export class DeleteContentComponent {
   private readonly router = inject(Router);
   currentStep = 1;
   totalSteps = 2;
   questions: Question[] = [
      {
         image: 'assets/images/pseudo-illu.svg',
         title: 'PROBLEMS.DELETE_CONTENT.PSEUDO.TITLE',
         sections: [
            {
               name: 'reported',
               answers: [
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_TITLE',
                     value: true
                  },
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.PSEUDO.IDENTITY.ANSWERS.ANSWER_2_TITLE',
                     value: false
                  },
               ]
            },
         ]
      },
      {
         image: 'assets/images/bio-illu.svg',
         title: 'PROBLEMS.DELETE_CONTENT.BIO.TITLE',
         sections: [
            {
               name: 'violent',
               answers: [
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.BIO.IDENTITY.ANSWERS.ANSWER_1_TITLE',
                     value: true
                  },
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.BIO.IDENTITY.ANSWERS.ANSWER_2_TITLE',
                     value: false
                  },
               ]
            },
         ]
      }
   ]
   currentQuestion = this.questions[this.currentStep - 1]
   formGroup = new FormGroup({
      reported: new FormControl(),
      violent: new FormControl(),
   });

   onClickNext() {
      this.currentStep++;
      this.currentQuestion = this.questions[this.currentStep - 1]
   }

   onClickPrevious() {
      this.currentStep--;
      this.currentQuestion = this.questions[this.currentStep - 1]
   }

   onClickResults() {
      const reported = this.formGroup.value.reported;
      const violent = this.formGroup.value.violent;
      console.log(reported, violent);
      if (reported === true && violent === true) {
         this.router.navigate(['delete-content', 'reported-violent-content']);
      } else if (reported === true && violent === false) {
         this.router.navigate(['delete-content', 'reported-content']);
      } else if (reported === false && violent === true) {
         this.router.navigate(['delete-content', 'unreported-violent-content']);
      } else if (reported === false && violent === false) {
         this.router.navigate(['delete-content', 'unreported-content']);
      }
   }
}
