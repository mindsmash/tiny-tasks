import { Directive, Input, TemplateRef, ViewContainerRef, Inject } from '@angular/core';

export class LetContext<T> {
  constructor(
    private readonly dir: TinyLetDirective<T>
  ) { }

  get tinyLet(): T {
    return this.dir.tinyLet;
  }
}

@Directive({
  selector: '[tinyLet]'
})
export class TinyLetDirective<T> {
  @Input() tinyLet: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
