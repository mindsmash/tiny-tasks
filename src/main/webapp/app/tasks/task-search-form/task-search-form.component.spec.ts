import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {TaskSearchFormComponent} from './task-search-form.component';


describe('TaskSearchFormComponent', () => {
  let component: TaskSearchFormComponent;
  let fixture: ComponentFixture<TaskSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskSearchFormComponent],
      providers: [{provide: FormBuilder, useValue: new FormBuilder()}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchFormComponent);
    component = fixture.componentInstance;
    component.initialTerm = '123';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on value changes', fakeAsync(() => {
    const emitSpy = spyOn(component.searched, 'emit');
    component.searchControl.setValue('5');
    tick(300);
    expect(emitSpy).toHaveBeenCalledWith('5');
  }));

  it('should set control value', () => {
    expect(component.searchControl.value).toBe('123');
  });

  it('should reset form onClick', () => {
    component.searchControl.setValue('4');
    component.onClick();
    expect(component.searchControl.value).toBe('');
  });
});
