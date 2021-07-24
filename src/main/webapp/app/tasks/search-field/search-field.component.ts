import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tiny-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }

  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  private _value = '';
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this.valueChange.emit(value);
  }

  ngOnInit(): void {
    this.value = this.route.snapshot.queryParamMap.get('filterBy') || '';
  }
}
