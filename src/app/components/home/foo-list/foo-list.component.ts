import {Component, OnInit, signal} from '@angular/core';
import Foo from "../../../model/foo.model";
import {take, tap} from "rxjs";
import {FooService} from "../../../service/foo.service";

import PageResultModel from "../../../model/page-result.model";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-foo-list',
   imports: [
      ReactiveFormsModule
   ],
  templateUrl: './foo-list.component.html'
})
export class FooListComponent implements OnInit {

   readonly foos = signal<PageResultModel<Foo[]> | null>(null);
   readonly page = signal<number>(1);
   readonly limit = signal<number>(10);
   readonly filter = signal<string>("");
   
   readonly loading = signal<boolean>(false);



   get TABLE_DATA() {
      return this.foos()?.content || [];
   }

   constructor(
      private _fooService: FooService
   ) { }

   ngOnInit(): void {
      this.findPage();
   }

   handlePageChange($event: any) {
      this.page.set($event.currentPage);
      this.limit.set($event.rowsPerPage);
      this.findPage(this.filter());
   }

   handleSearch($event: string) {
      this.filter.set($event);
      this.findPage($event)
   }

   private findPage(filter?: string) {
      this.loading.set(true);
      this._fooService.findAll(this.page() - 1, this.limit(), filter)
         .pipe(
            tap(() => this.loading.set(false)),
            take(1)
         )
         .subscribe(foos => {
            this.foos.set(foos);
         })
   }
}
