import { animate, style, transition, trigger } from "@angular/animations";
import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
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

export const fadeInWithDelay = trigger("fadeInWithDelay", [
   transition(":enter", [
      style({
         opacity: 0,
      }),
      animate(
         "200ms 800ms ease-out",
         style({
            opacity: 1,
         })
      ),
   ]),
]);

export const fromBottomRight = trigger("fromBottomRight", [
   transition(":enter", [
      style({ opacity: 0, transform: "translate(30px, 30px)" }),
      animate(
         "500ms 300ms ease-out",
         style({ opacity: 1, transform: "translate(0, 0)" })
      ),
   ]),
]);

export const fromBottomLeft = trigger("fromBottomLeft", [
   transition(":enter", [
      style({ opacity: 0, transform: "translate(-30px, 30px)" }),
      animate(
         "500ms 300ms ease-out",
         style({ opacity: 1, transform: "translate(0, 0)" })
      ),
   ]),
]);

export const fadeInBtnWithDelay = trigger("fadeInBtnWithDelay", [
   transition(":enter", [
      style({
         opacity: 0,
      }),
      animate(
         "500ms 300ms ease-out",
         style({
            opacity: 1,
         })
      ),
   ]),
]);

@Component({
   selector: "app-hacking",
   imports: [
      ButtonBackComponent,
      ButtonComponent,
      MatRadioModule,
      ReactiveFormsModule,
      TranslatePipe,
      StepperComponent,
   ],
   templateUrl: "./hacking.component.html",
   styleUrl: "./hacking.component.scss",
   animations: [
      fadeInWithDelay,
      fromBottomRight,
      fromBottomLeft,
      fadeInBtnWithDelay,
   ],
})
export class HackingComponent implements OnInit {
   private readonly router = inject(Router);
   currentStep = 1;
   totalSteps = 1;
   questions: Question[] = [
      {
         title: "PROBLEMS.HACKING.SITUATION.TITLE",
         sections: [
            {
               name: "have_access",
               answers: [
                  {
                     title: "PROBLEMS.HACKING.SITUATION.NONE.ANSWERS.ANSWER_1_TITLE",
                     value: true,
                  },
                  {
                     title: "PROBLEMS.HACKING.SITUATION.NONE.ANSWERS.ANSWER_2_TITLE",
                     value: false,
                  },
               ],
            },
         ],
      },
   ];
   currentQuestion = this.questions[this.currentStep - 1];
   formGroup = new FormGroup({
      have_access: new FormControl(),
   });
   showTutorial: boolean = true;
   showBox1 = false;
   showBox2 = false;
   showBox3 = false;
   onFadeInDone() {
      this.showBox1 = true;
   }

   onBox1Done() {
      this.showBox2 = true;
      this.showBox3 = true;
   }

   ngOnInit(): void {
      localStorage.getItem("hacking-tutorial") === "true"
         ? (this.showTutorial = false)
         : (this.showTutorial = true);
   }

   onCloseTutorial() {
      localStorage.setItem("hacking-tutorial", "true");
      this.showTutorial = false;
   }

   selectAnswer(sectionName: string, value: any) {
      const control = this.formGroup.get(sectionName);
      if (control) {
         control.setValue(value);
      }
   }

   onClickResults() {
      const have_access = this.formGroup.value.have_access;

      if (have_access) {
         this.router.navigate(["hacking", "have-access"]);
      } else {
         this.router.navigate(["hacking", "no-access"]);
      }
   }
}
