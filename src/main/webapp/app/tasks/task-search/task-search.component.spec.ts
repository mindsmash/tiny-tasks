import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed , fakeAsync, tick,} from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskSearchComponent } from './task-search.component';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskSearchComponent],
      imports: [
        BrowserModule,
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search term when input changes', fakeAsync(() => {
    const spy = spyOn(component.searchUpdated, 'emit');
    component.searchField.setValue('frontend');
    fixture.detectChanges();
    tick(401);
    expect(spy).toHaveBeenCalledWith('frontend');
  }));

  it('should have reset button when search input has text', () => {
    component.searchField.setValue('frontend');
    fixture.detectChanges();
    const resetButton = debugElement.query(By.css('#reset-button'));
    expect(resetButton).toBeTruthy();
  });

  it('should reset search term when reset button clicked', () => {
    component.searchField.setValue('frontend');
    fixture.detectChanges();
    const resetButton = debugElement.query(By.css('#reset-button'));
    resetButton.triggerEventHandler('click', null);
    expect(component.searchField.value).toEqual('');
  });
});
