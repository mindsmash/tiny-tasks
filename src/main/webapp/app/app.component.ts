import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {


}
