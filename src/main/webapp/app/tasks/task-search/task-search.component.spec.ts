import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskSearchComponent} from './task-search.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskSearchComponent],
      imports: [
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  afterEach(() => {
    component.taskSearchControl.setValue('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have clear button when search field is populated', () => {
    // first
    let clearButton = debugElement.query(By.css('#clearButton'));
    expect(clearButton).toBeFalsy();

    // when
    component.taskSearchControl.setValue('test');
    fixture.detectChanges();

    // then
    clearButton = debugElement.query(By.css('#clearButton'));
    expect(clearButton).toBeTruthy();
  });

  it('should clear text field on button press', () =>
  {
    // first
    component.taskSearchControl.setValue('test');
    fixture.detectChanges();

    // when
    const clearButton = debugElement.query(By.css('#clearButton'));
    clearButton.triggerEventHandler('click', null);

    // then
    expect(component.taskSearchControl.value).toEqual('');
  });

});
