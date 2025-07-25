import { Component, inject, OnInit } from '@angular/core';
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { MatRadioButton } from "@angular/material/radio";
import { MatButtonModule } from '@angular/material/button';
import { StepperComponent } from "../../design-system/stepper/stepper.component";
import { MatIconModule } from "@angular/material/icon";
import { Router } from '@angular/router';


type Question = {
   image: string,
   title: string,
   sections: Section[]
}
type Section = {
   title?: string,
   answers: Answer[]
}
type Answer = {
   title: string,
   description?: string
}
@Component({
   selector: 'app-visibility-check',
   imports: [ButtonBackComponent, MatRadioButton, MatButtonModule, StepperComponent, MatIconModule],
   templateUrl: './visibility-check.component.html',
   styleUrl: './visibility-check.component.scss'
})
export class VisibilityCheckComponent implements OnInit {
   private readonly router = inject(Router);
   currentStep = 1;
   totalSteps = 2;
   questions: Question[] = [
      {
         image: 'assets/images/pseudo-illu.svg',
         title: 'Que contient ton pseudo ?',
         sections: [
            {
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
               answers: [
                  {
                     title: 'Je n’ai rien écrit dans ma bio',
                  },
               ]
            },
            {
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
               title: '🎭 Centres d’intérêt',
               answers: [
                  {
                     title: 'Un lien vers mon club ou une association où je participe.',
                     description: '(ex : @VolleyNantes)'
                  },
               ]
            },
            {
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

   ngOnInit(): void {
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
      this.router.navigate(['tools', 'visibility-check', 'results'])
   }
}
