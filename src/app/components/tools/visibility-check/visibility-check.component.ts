import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatRadioChange, MatRadioModule } from "@angular/material/radio";
import { Router } from '@angular/router';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { StepperComponent } from "../../design-system/stepper/stepper.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

type Question = {
   image: string,
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
   selector: 'app-visibility-check',
   imports: [TranslatePipe, ButtonBackComponent, MatRadioModule, MatButtonModule, StepperComponent, MatIconModule, ReactiveFormsModule],
   templateUrl: './visibility-check.component.html',
   styleUrl: './visibility-check.component.scss'
})
export class VisibilityCheckComponent {
   private readonly router = inject(Router);
   currentStep = 1;
   totalSteps = 2;
   questions: Question[] = [
      {
         image: 'assets/images/pseudo-illu.svg',
         title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.TITLE',
         sections: [
            {
               name: 'pseudo_identity',
               title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_2_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_2_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_3_TITLE',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_4_TITLE',
                  }
               ]
            },
            {
               name: 'pseudo_origin',
               title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_1_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_1_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_2_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_2_DESCRIPTION',
                  },
               ]
            }
         ]
      },
      {
         image: 'assets/images/bio-illu.svg',
         title: 'TOOLS.VISIBILITY_CHECK.BIO.TITLE',
         sections: [
            {
               name: 'bio_empty',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.EMPTY.ANSWERS.ANSWER_1_TITLE',
                  },
               ]
            },
            {
               name: 'bio_identity',
               title: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_1_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_1_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_2_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_2_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_3_TITLE',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_4_TITLE',
                  }
               ]
            },
            {
               name: 'bio_origin',
               title: 'TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_1_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_1_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_2_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_2_DESCRIPTION',
                  },
               ]
            },
            {
               name: 'bio_digital_life',
               title: 'TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_1_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_1_DESCRIPTION',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_2_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_2_DESCRIPTION',
                  },
               ]
            },
            {
               name: 'bio_interest',
               title: 'TOOLS.VISIBILITY_CHECK.BIO.INTEREST.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.INTEREST.ANSWERS.ANSWER_1_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.INTEREST.ANSWERS.ANSWER_1_TITLE',
                  },
               ]
            },
            {
               name: 'bio_education_pro',
               title: 'TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.TITLE',
               answers: [
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.ANSWERS.ANSWER_1_TITLE',
                  },
                  {
                     title: 'TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.ANSWERS.ANSWER_2_TITLE',
                     description: 'TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.ANSWERS.ANSWER_2_DESCRIPTION',
                  },
               ]
            },
         ]
      }
   ]
   currentQuestion = this.questions[this.currentStep - 1]
   pseudoKeys = ['pseudo_identity', 'pseudo_origin'];
   bioKeys = [
      'bio_identity',
      'bio_origin',
      'bio_digital_life',
      'bio_interest',
      'bio_education_pro',
   ];
   formGroup = new FormGroup({
      pseudo_identity: new FormControl(''),
      pseudo_origin: new FormControl(''),
      bio_empty: new FormControl(this.questions[1].sections[0].answers[0].title),
      bio_identity: new FormControl(''),
      bio_origin: new FormControl(''),
      bio_digital_life: new FormControl(''),
      bio_interest: new FormControl(''),
      bio_education_pro: new FormControl(''),
   });

   onRadioChange($event: MatRadioChange<string>) {
      const name = $event.source.name;
      const value = $event.value;
      if (name === 'bio_empty' && value) {
         this.formGroup.patchValue({
            bio_identity: '',
            bio_origin: '',
            bio_digital_life: '',
            bio_interest: '',
            bio_education_pro: '',
         });
      } else if (this.bioKeys.includes(name)) {
         this.formGroup.patchValue({
            bio_empty: ''
         });
      }
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
