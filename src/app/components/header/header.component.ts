import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../service/theme.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
   selector: 'app-header',
   standalone: true,
   imports: [MatIconModule, MatToolbarModule, MatMenuModule, TitleCasePipe, MatButtonModule],
   templateUrl: './header.component.html'
})
export class HeaderComponent {

   constructor(public _themeService: ThemeService) { }

}
