import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {MatButtonModule, MatInputModule, MatIconModule, MatCheckboxModule, MatListModule} from '@angular/material';

import { AppComponent } from './app.component';
import {TaskListComponent} from "./task-list/task-list.component";
import {TaskListItemComponent} from "./task-list-item/task-list-item.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app;

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
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should initialize array with zero tasks', async(() => {
    expect(app.tasks.length == 0);
  }));

  it('should add task', async(() => {
    let size = app.tasks.length;
    let onAddTask = app.onAddTask("ola");
    expect(app.tasks.length > size);
  }));

  it('should remove all elements', async(() => {
    let size = app.tasks.length;
    let onAddTask = app.onAddTask("ola");
    expect(app.tasks.length > size);
    app.clear();
    expect(app.tasks.length == 0);
  }));

  it('should toggle task', async(() => {
    let onAddTask = app.onAddTask("ola");
    let task = app.tasks[0];
    expect(task.complete == false);
    app.onToggleTaskComplete(task);
    expect(app.tasks[0].complete == true);
  }));

  it('should remove task', async(() => {
    let size = app.tasks.length;
    let task = app.onAddTask("ola");
    expect(app.tasks.length > size);

    app.onRemoveTask(task);
    expect(size == (app.tasks.length-1));
  }));

});
