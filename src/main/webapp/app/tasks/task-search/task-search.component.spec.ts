import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskSearchComponent } from './task-search.component';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskSearchComponent],
    }).overrideTemplate(TaskSearchComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form after button selected', () => {
    // given
    component.taskSearch.setValue({name: 'My task'});
    const formReset = spyOn(component.taskSearch, 'reset');

    // when
    component.resetForm();

    // then
    expect(formReset).toHaveBeenCalled();
  });

});
