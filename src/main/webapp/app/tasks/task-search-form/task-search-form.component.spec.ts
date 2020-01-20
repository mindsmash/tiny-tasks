import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskService } from '../task.service';
import { TaskSearchFormComponent } from './task-search-form.component';

describe('TaskSearchFormComponent', () => {
  let component: TaskSearchFormComponent;
  let fixture: ComponentFixture<TaskSearchFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSearchFormComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['sendSearchTerm'])
      }]
    }).overrideTemplate(TaskSearchFormComponent, '')
    .compileComponents();

    taskService = TestBed.get('TaskService');

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called sendSearchTerm', () => {
    component.searchInput.setValue('another input');
    expect(taskService.sendSearchTerm).toHaveBeenCalledWith('another input');
  });
});
