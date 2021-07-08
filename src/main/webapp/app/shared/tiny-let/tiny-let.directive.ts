import { Directive, Input, TemplateRef, ViewContainerRef, Inject } from '@angular/core';

export class LetContext<T> {
  constructor(
    private readonly directive: TinyLetDirective<T>
  ) { }

  get tinyLet(): T | null {
    return this.directive.tinyLet;
  }
}

@Directive({
  selector: '[tinyLet]'
})
export class TinyLetDirective<T> {
  @Input() tinyLet: T | null = null;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
