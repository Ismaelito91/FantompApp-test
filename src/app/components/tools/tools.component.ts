import { Component } from '@angular/core';
import { BlurEditorComponent } from './blur-editor/blur-editor.component';

@Component({
   selector: 'app-tools',
   standalone: true,
   imports: [BlurEditorComponent],
   templateUrl: './tools.component.html',
   styleUrl: './tools.component.scss'
})
export class ToolsComponent {

}
