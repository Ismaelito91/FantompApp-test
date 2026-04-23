import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const EMOJI_REGEX =
   /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*/gu;

@Pipe({
   name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
   private sanitizer = inject(DomSanitizer);

   transform(value: string | null | undefined): SafeHtml {
      if (!value) return '';
      const html = value.replace(
         EMOJI_REGEX,
         (m) => `<span aria-hidden="true">${m}</span>`,
      );
      return this.sanitizer.bypassSecurityTrustHtml(html);
   }
}
