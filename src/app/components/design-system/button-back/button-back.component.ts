import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
   selector: 'app-button-back',
   imports: [MatIconModule, MatButtonModule, RouterLink],
   templateUrl: './button-back.component.html',
   styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent {
   link = input.required<string>();
}
