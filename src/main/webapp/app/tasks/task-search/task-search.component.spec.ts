import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchComponent } from './task-search.component';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskSearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value of search query change', () => {
    const spy = spyOn(component.search, 'emit');
    component.searchInput.setValue('component');
    expect(spy).toHaveBeenCalled();
  });

  it('should emit correct value of search query', () => {
    const spy = spyOn(component.search, 'emit');
    component.searchInput.setValue('pipe');
    expect(spy).toHaveBeenCalledWith('pipe');
  });
});
