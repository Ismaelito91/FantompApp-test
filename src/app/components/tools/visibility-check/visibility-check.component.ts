import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { StepperComponent } from "../../design-system/stepper/stepper.component";
import { ButtonComponent } from "../../design-system/button/button.component";

type Question = {
   image: string;
   title: string;
   sections: Section[];
};
type Section = {
   name: string;
   title?: string;
   answers: Answer[];
};
type Answer = {
   title: string;
   description?: string;
};
type Results = {
   pseudo: string[];
   bio: string[];
};
@Component({
   selector: "app-visibility-check",
   imports: [
      TranslatePipe,
      ButtonBackComponent,
      MatCheckboxModule,
      MatButtonModule,
      StepperComponent,
      MatIconModule,
      ReactiveFormsModule,
      ButtonComponent,
   ],
   templateUrl: "./visibility-check.component.html",
   styleUrl: "./visibility-check.component.scss",
})
export class VisibilityCheckComponent {
   private readonly router = inject(Router);
   private readonly translateService = inject(TranslateService);
   currentStep = 1;
   totalSteps = 2;
   questions: Question[] = [
      {
         image: "assets/images/pseudo-illu.svg",
         title: "TOOLS.VISIBILITY_CHECK.PSEUDO.TITLE",
         sections: [
            {
               name: "pseudo_identity",
               title: "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_1_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_2_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_2_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_3_TITLE",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.PSEUDO.IDENTITY.ANSWERS.ANSWER_4_TITLE",
                  },
               ],
            },
            {
               name: "pseudo_origin",
               title: "TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_1_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_1_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_2_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.PSEUDO.ORIGIN.ANSWERS.ANSWER_2_DESCRIPTION",
                  },
               ],
            },
         ],
      },
      {
         image: "assets/images/bio-illu.svg",
         title: "TOOLS.VISIBILITY_CHECK.BIO.TITLE",
         sections: [
            {
               name: "bio_empty",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.EMPTY.ANSWERS.ANSWER_1_TITLE",
                  },
               ],
            },
            {
               name: "bio_identity",
               title: "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_1_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_1_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_2_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_2_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_3_TITLE",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.IDENTITY.ANSWERS.ANSWER_4_TITLE",
                  },
               ],
            },
            {
               name: "bio_origin",
               title: "TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_1_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_1_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_2_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.ORIGIN.ANSWERS.ANSWER_2_DESCRIPTION",
                  },
               ],
            },
            {
               name: "bio_digital_life",
               title: "TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_1_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_1_DESCRIPTION",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_2_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.DIGITAL_LIFE.ANSWERS.ANSWER_2_DESCRIPTION",
                  },
               ],
            },
            {
               name: "bio_interest",
               title: "TOOLS.VISIBILITY_CHECK.BIO.INTEREST.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.INTEREST.ANSWERS.ANSWER_1_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.INTEREST.ANSWERS.ANSWER_1_TITLE",
                  },
               ],
            },
            {
               name: "bio_education_pro",
               title: "TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.TITLE",
               answers: [
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.ANSWERS.ANSWER_1_TITLE",
                  },
                  {
                     title: "TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.ANSWERS.ANSWER_2_TITLE",
                     description:
                        "TOOLS.VISIBILITY_CHECK.BIO.EDUCATION_PRO.ANSWERS.ANSWER_2_DESCRIPTION",
                  },
               ],
            },
         ],
      },
   ];
   currentQuestion = this.questions[this.currentStep - 1];
   pseudoKeys = ["pseudo_identity", "pseudo_origin"];
   bioKeys = [
      "bio_identity",
      "bio_origin",
      "bio_digital_life",
      "bio_interest",
      "bio_education_pro",
   ];
   formGroup = new FormGroup({
      pseudo_identity: new FormControl<string[]>([]),
      pseudo_origin: new FormControl<string[]>([]),
      bio_empty: new FormControl<string[]>([
         this.questions[1].sections[0].answers[0].title,
      ]),
      bio_identity: new FormControl<string[]>([]),
      bio_origin: new FormControl<string[]>([]),
      bio_digital_life: new FormControl<string[]>([]),
      bio_interest: new FormControl<string[]>([]),
      bio_education_pro: new FormControl<string[]>([]),
   });

   isChecked(section: string, answer: string): boolean {
      return this.formGroup.get(section)?.value?.includes(answer);
   }

   onCheckboxChange(section: string, answer: string, checked: boolean) {
      const control = this.formGroup.get(section);
      if (!control) return;

      let values: string[] = control.value || [];
      if (checked) {
         values = [...values, answer];
      } else {
         values = values.filter((v) => v !== answer);
      }
      control.setValue(values);

      // logique spéciale "bio_empty"
      if (section === "bio_empty" && checked) {
         this.bioKeys.forEach((key) => this.formGroup.get(key)?.setValue([]));
      } else if (this.bioKeys.includes(section)) {
         this.formGroup.get("bio_empty")?.setValue([]);
      }
   }

   onClickNext() {
      this.currentStep++;
      this.currentQuestion = this.questions[this.currentStep - 1];
   }

   onClickPrevious() {
      this.currentStep--;
      this.currentQuestion = this.questions[this.currentStep - 1];
   }

   onClickResults() {
      const formValues = this.formGroup.value as Record<string, string[]>;

      const results: Results = {
         pseudo: this.pseudoKeys.flatMap((key) => formValues[key] || []),
         bio: this.bioKeys.flatMap((key) => formValues[key] || []),
      };

      this.router.navigate(["tools", "visibility-check", "results"], {
         state: { results },
      });
   }

   forceCheckboxSelection(
      event: Event,
      sectionName: string,
      answerTitle: string
   ) {
      // Empêcher la double exécution si le clic est déjà sur l'input checkbox
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT") {
         return;
      }

      // Récupérer l'état actuel et inverser la sélection
      const isCurrentlyChecked = this.isChecked(sectionName, answerTitle);
      this.onCheckboxChange(sectionName, answerTitle, !isCurrentlyChecked);
   }

   getCleanTitle(translationKey: string | undefined): string {
      if (!translationKey) return "";
      const translated = this.translateService.instant(translationKey);
      // Retirer toutes les balises <span aria-hidden="true">...</span> (avec variations d'espaces et d'attributs)
      return translated.replace(/<span[^>]*aria-hidden\s*=\s*["']true["'][^>]*>.*?<\/span>\s*/gi, "").trim();
   }
}
