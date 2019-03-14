import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';

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
        MatIconModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    // component.tasks = ['Buy milk', 'Take out the trash'];
    fixture.detectChanges();
  });

  // it('should create the app', async(() => {
  //   expect(component).toBeTruthy();
  // }));

  // it ('should add a task', () => {
  //   // when
  //   component.add('Go to the gym');

  //   // then
  //   expect(component.tasks).toContain('Go to the gym');
  //   expect(component.tasks.indexOf('Go to the gym')).toEqual(2);
  // });

  // it ('should remove a task', () => {
  //   // when
  //   component.remove(0);

  //   // then
  //   expect(component.tasks).not.toContain('Buy milk');
  //   expect(component.tasks.indexOf('Take out the trash')).toEqual(0);
  // });

  // it ('should clear all tasks', () => {
  //   // when
  //   component.clear();

  //   // then
  //   expect(component.tasks).toEqual([]);
  // });
});
