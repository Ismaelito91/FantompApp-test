import { Component, inject, OnInit, signal } from '@angular/core';
import { Card1Component } from "../design-system/card-1/card-1.component";
import { PageComponentService } from '../../service/page-component.service';
import PageComponentModel from '../../model/page-component.model';

@Component({
   selector: 'app-problems',
   standalone: true,
   imports: [Card1Component],
   templateUrl: './problems.component.html',
   styleUrl: './problems.component.scss'
})
export class ProblemsComponent implements OnInit {

   private readonly pageComponentService = inject(PageComponentService);
   problems = signal<PageComponentModel[]>([]);

   ngOnInit(): void {
      this.loadProblems();
   }

   private loadProblems(): void {
      this.pageComponentService.getPageComponentsBySectionId(1).subscribe({
         next: (data) => this.problems.set(data),
         error: (err) => console.error('Erreur lors du chargement des problèmes', err)
      });
   }
}
