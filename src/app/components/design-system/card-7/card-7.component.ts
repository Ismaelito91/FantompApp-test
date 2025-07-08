import { Component } from '@angular/core';
import { Card8Component } from "../card-8/card-8.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-7',
  imports: [Card8Component, MatIconModule, RouterLink],
  templateUrl: './card-7.component.html',
  styleUrl: './card-7.component.scss'
})
export class Card7Component {

}
