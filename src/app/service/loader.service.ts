import {Injectable, signal} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class LoaderService {

   isShown = signal<boolean>(false)

   show() {
      console.debug("Showing loader");
      this.isShown.set(true);
   }

   hide() {
      console.debug("Hiding loader");
      this.isShown.set(false);
   }

}
