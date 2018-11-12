import { TestBed, async } from '@angular/core/testing';
import {MatButtonModule, MatInputModule, MatIconModule, MatCheckboxModule, MatListModule} from '@angular/material';

import { AppComponent } from './app.component';
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskListItemComponent} from "./task-list-item/task-list-item.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TaskListComponent,
        TaskListItemComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        FormsModule
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
