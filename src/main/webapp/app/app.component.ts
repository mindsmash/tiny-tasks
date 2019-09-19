import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private model: any = {};

  constructor() {
  }

  public ngOnInit(): void {
  }

}
