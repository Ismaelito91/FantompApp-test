import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TagUnclickableVariant } from '../../../model/type/tag-unclickable-variant.type';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';

@Component({
   selector: 'app-tag-unclickable',
   imports: [SafeHtmlPipe, NgClass],
   templateUrl: './tag-unclickable.component.html',
   styleUrl: './tag-unclickable.component.scss'
})
export class TagUnclickableComponent {
   label = input.required<string>();
   variant = input<TagUnclickableVariant>('primary')
}
