import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTranslatedElement]',
  standalone: true,
})
export default class TranslatedElementDirective {
  @Input('appTranslatedElement') elementKey: string;

  readonly viewRef = inject(ViewContainerRef);
  readonly templateRef = inject(TemplateRef<HTMLElement>);
}
