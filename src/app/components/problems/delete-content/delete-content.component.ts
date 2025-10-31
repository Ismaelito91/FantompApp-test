import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import { Router } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { ButtonBackComponent } from "../../design-system/button-back/button-back.component";
import { ButtonComponent } from "../../design-system/button/button.component";
import { StepperComponent } from "../../design-system/stepper/stepper.component";

type Question = {
   image?: string;
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
   value?: boolean;
};

@Component({
   selector: "app-delete-content",
   imports: [
      TranslatePipe,
      ButtonBackComponent,
      MatRadioModule,
      MatButtonModule,
      StepperComponent,
      MatIconModule,
      ReactiveFormsModule,
      ButtonComponent,
   ],
   templateUrl: "./delete-content.component.html",
   styleUrl: "./delete-content.component.scss",
})
export class DeleteContentComponent {
   private readonly router = inject(Router);
   currentStep = 1;
   totalSteps = 2;
   questions: Question[] = [
      {
         title: "PROBLEMS.DELETE_CONTENT.REPORTED.TITLE",
         sections: [
            {
               name: "reported",
               answers: [
                  {
                     title: "PROBLEMS.DELETE_CONTENT.REPORTED.NONE.ANSWERS.ANSWER_1_TITLE",
                     value: true,
                  },
                  {
                     title: "PROBLEMS.DELETE_CONTENT.REPORTED.NONE.ANSWERS.ANSWER_2_TITLE",
                     value: false,
                  },
               ],
            },
         ],
      },
      {
         title: "PROBLEMS.DELETE_CONTENT.VIOLENT.TITLE",
         sections: [
            {
               name: "violent",
               answers: [
                  {
                     title: "PROBLEMS.DELETE_CONTENT.VIOLENT.NONE.ANSWERS.ANSWER_1_TITLE",
                     value: true,
                  },
                  {
                     title: "PROBLEMS.DELETE_CONTENT.VIOLENT.NONE.ANSWERS.ANSWER_2_TITLE",
                     value: false,
                  },
               ],
            },
         ],
      },
   ];
   currentQuestion = this.questions[this.currentStep - 1];
   formGroup = new FormGroup({
      reported: new FormControl(),
      violent: new FormControl(),
   });

   onClickNext() {
      this.currentStep++;
      this.currentQuestion = this.questions[this.currentStep - 1];
   }

   onClickPrevious() {
      this.currentStep--;
      this.currentQuestion = this.questions[this.currentStep - 1];
   }

   onClickResults() {
      const reported = this.formGroup.value.reported;
      const violent = this.formGroup.value.violent;
      if (violent) {
         this.router.navigate(["delete-content", "violent-content"], {
            state: { reported },
         });
      } else {
         if (reported) {
            this.router.navigate(["delete-content", "reported-content"]);
         } else {
            this.router.navigate(["delete-content", "unreported-content"]);
         }
      }
   }

   selectAnswer(sectionName: string, value: any) {
      const control = this.formGroup.get(sectionName);
      if (control) {
         control.setValue(value);
      }
   }
}
