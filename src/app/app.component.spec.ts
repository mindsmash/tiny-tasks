import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Task } from './objects/task';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatDatepickerModule, 
        MatNativeDateModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.tasks = [new Task('Buy milk',''), new Task('Take out the trash','')];
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it ('should add a task', () => {
    // when
    component.add('Go to the gym','');

    // then
    expect(component.tasks[2].getName()).toEqual('Go to the gym');
    expect(component.tasks.length).toEqual(3);
  });

  it ('should remove a task', () => {
    // when
    component.remove(0);

    // then
    expect(component.tasks[0].getName()).not.toEqual('Buy milk');
    expect(component.tasks[0].getName()).toEqual('Take out the trash');
  });

  it ('should be created',()=>{
    expect(component.tasks[0].getStatus()).toEqual("Created");
    expect(component.tasks[1].getStatus()).toEqual("Created");
  });

  it ('should mark as in progress a task', () =>{
    component.start(0);

    expect(component.tasks[0].getStatus()).toEqual("InProgress");
  });

  it ('should mark as done a task', () =>{
    component.finish(0);

    expect(component.tasks[0].getStatus()).toEqual("Done");
  });

  it ('should clear all tasks', () => {
    // when
    component.clear();

    // then
    expect(component.tasks).toEqual([]);
  });
});
