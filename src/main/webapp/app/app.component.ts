import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  now$: Observable<Date>;

  ngOnInit(): void {
    this.now$ = timer(0, 1000).pipe(map(() => new Date()));
  }
}
