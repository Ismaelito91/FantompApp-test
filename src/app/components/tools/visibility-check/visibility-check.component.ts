import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatRadioChange, MatRadioModule } from "@angular/material/radio";
import { Router } from '@angular/router';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { StepperComponent } from "../../design-system/stepper/stepper.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
   imports: [ButtonBackComponent, MatRadioModule, MatButtonModule, StepperComponent, MatIconModule, ReactiveFormsModule],
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
         title: 'Que contient ton pseudo ?',
         sections: [
            {
               name: 'pseudo_identity',
               title: '🪪 Identité',
               answers: [
                  {
                     title: 'Mon nom ou mon prénom en entier',
                     description: '(exemple : Martin)'
                  },
                  {
                     title: 'Mon nom ou mon prénom en abrégé.',
                     description: '(exemple: Mrt1)'
                  },
                  {
                     title: 'Mon surnom',
                  },
                  {
                     title: 'Ma date de naissance',
                  }
               ]
            },
            {
               name: 'pseudo_origin',
               title: '🗺️ Origine géographique ou culturelle',
               answers: [
                  {
                     title: 'Mon code postal',
                     description: '(exemple: 78 ou 44300)'
                  },
                  {
                     title: 'Mon lieu de vie ou d’origine',
                     description: '(Ville, région, pays, emoji de drapeau.)'
                  },
               ]
            }
         ]
      },
      {
         image: 'assets/images/bio-illu.svg',
         title: 'Que contient ta bio ?',
         sections: [
            {
               name: 'bio_empty',
               answers: [
                  {
                     title: 'Je n’ai rien écrit dans ma bio',
                  },
               ]
            },
            {
               name: 'bio_identity',
               title: '🪪 Identité',
               answers: [
                  {
                     title: 'Mon nom ou mon prénom en entier',
                     description: '(exemple : Martin)'
                  },
                  {
                     title: 'Mon nom ou mon prénom en abrégé.',
                     description: '(exemple: Mrt1)'
                  },
                  {
                     title: 'Mon surnom',
                  },
                  {
                     title: 'Ma date de naissance',
                  }
               ]
            },
            {
               name: 'bio_origin',
               title: '🗺️ Origine géographique ou culturelle',
               answers: [
                  {
                     title: 'Mon code postal',
                     description: '(exemple: 78 ou 44300)'
                  },
                  {
                     title: 'Mon lieu de vie ou d’origine',
                     description: '(Ville, région, pays, emoji de drapeau.)'
                  },
               ]
            },
            {
               name: 'bio_digital_life',
               title: '👥 Vie numérique',
               answers: [
                  {
                     title: 'Les liens vers mes autres réseaux.',
                     description: '(Twitter, Instagram, TikTok, LinkedIn).'
                  },
                  {
                     title: 'Les comptes de mon entourage',
                     description: '(Amis, relations amoureuses...)'
                  },
               ]
            },
            {
               name: 'bio_interest',
               title: '🎭 Centres d’intérêt',
               answers: [
                  {
                     title: 'Un lien vers mon club ou une association où je participe.',
                     description: '(ex : @VolleyNantes)'
                  },
               ]
            },
            {
               name: 'bio_education_pro',
               title: '🏫 Éducation ou profession',
               answers: [
                  {
                     title: 'Une mention de mon établissement ou de mon entreprise.',
                  },
                  {
                     title: 'Mes compétences',
                     description: '(Apprenti pâtissier, Étudiant en médecine…)'
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
