import {Component, input, OnInit, signal} from '@angular/core';
import {FooService} from "../../service/foo.service";
import {take} from "rxjs";
import Foo from "../../model/foo.model";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-foo',
   imports: [
      JsonPipe
   ],
  templateUrl: './foo.component.html'
})
export class FooComponent implements OnInit {
   
   id = input<number>();
   
   foo = signal<Foo | null>(null);

   constructor(
      private _fooService: FooService
   ) { }

   ngOnInit(): void {
      this._fooService.find(this.id()!)
         .pipe(take(1))
         .subscribe(foo => {
            this.foo.set(foo);
         });
   }

}
