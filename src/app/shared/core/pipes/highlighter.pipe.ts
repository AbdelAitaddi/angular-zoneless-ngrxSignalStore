import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlighter', standalone: true })
export class HighlighterPipe implements PipeTransform {
  transform(value: string, args: string, type: string): unknown {
    if (!args) return value;
    if (type === 'full') {
      const re = new RegExp('\\b(' + args + '\\b)', 'igm');
      value = value.replace(re, '<span class="highlighted-text">$1</span>');
    } else {
      const re = new RegExp(args, 'igm');
      value = value.replace(re, '<span class="highlighted-text">$&</span>');
    }

    return value;
  }
}
