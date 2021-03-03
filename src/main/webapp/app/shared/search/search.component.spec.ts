import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared.module';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let inputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(inputElement).toBeTruthy();
  });

  it('should display the reset button when input has value', () => {
    inputElement.triggerEventHandler('input', {
      target: {
          value: 'test',
      },
    });

    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('button'));

    expect(clearButton).toBeTruthy();
    expect(component.value).toBe('test');
  });

  it('should reset the value of the input after clicking the reset button', () => {
    inputElement.triggerEventHandler('input', {
      target: {
          value: 'test',
      },
    });

    fixture.detectChanges();

    const clearButton = fixture.debugElement.query(By.css('button'));

    clearButton.nativeElement.click();

    fixture.detectChanges();

    expect(component.value).toBe('');
  })
});
