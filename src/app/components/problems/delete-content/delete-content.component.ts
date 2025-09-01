import { Component, inject } from '@angular/core';
import { ButtonBackComponent } from '../../design-system/button-back/button-back.component';
import { StepperComponent } from '../../design-system/stepper/stepper.component';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
   description?: string
}
type Results = {
   pseudo: string[],
   bio: string[]
}

@Component({
   selector: 'app-delete-content',
   imports: [TranslatePipe, ButtonBackComponent, MatRadioModule, MatButtonModule,
      StepperComponent, MatIconModule, ReactiveFormsModule],
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
               name: 'pseudo_identity',
               answers: [
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_TITLE',
                  },
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.PSEUDO.IDENTITY.ANSWERS.ANSWER_2_TITLE',
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
               name: 'bio_identity',
               answers: [
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.BIO.IDENTITY.ANSWERS.ANSWER_1_TITLE',
                  },
                  {
                     title: 'PROBLEMS.DELETE_CONTENT.BIO.IDENTITY.ANSWERS.ANSWER_2_TITLE',
                  },
               ]
            },
         ]
      }
   ]
   currentQuestion = this.questions[this.currentStep - 1]
   pseudoKeys = ['pseudo_identity'];
   bioKeys = ['bio_identity'];
   formGroup = new FormGroup({
      pseudo_identity: new FormControl(''),
      bio_identity: new FormControl(''),
   });

   onRadioChange($event: MatRadioChange<string>) {
      const name = $event.source.name;
      const value = $event.value;

      console.log(name, value);
      // if (name === 'bio_empty' && value) {
      //    this.formGroup.patchValue({
      //       bio_identity: '',
      //       bio_origin: '',
      //       bio_digital_life: '',
      //       bio_interest: '',
      //       bio_education_pro: '',
      //    });
      // } else if (this.bioKeys.includes(name)) {
      //    this.formGroup.patchValue({
      //       bio_empty: ''
      //    });
      // }
   }

   onClickNext() {
      this.currentStep++;
      this.currentQuestion = this.questions[this.currentStep - 1]
   }

   onClickPrevious() {
      this.currentStep--;
      this.currentQuestion = this.questions[this.currentStep - 1]
   }

   onClickResults() {
      const formValues = this.formGroup.value as Record<string, string | null>;
      const results: Results = {
         pseudo: this.pseudoKeys
            .map(key => formValues[key])
            .filter(value => !!value) as string[],
         bio: this.bioKeys
            .map(key => formValues[key])
            .filter(value => !!value) as string[],
      };

      this.router.navigate(['tools', 'visibility-check', 'results'], { state: { results } });
   }
}
