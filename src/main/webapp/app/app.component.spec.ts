import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { TaskService } from './tasks/task.service';
import { Status } from './tasks/task';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('TaskService', ['getAll'])
      }]
    }).overrideTemplate(AppComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    const tasks$ = of([]);
    taskService.getAll.and.returnValue(tasks$);
    fixture.detectChanges();

  });

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should init the date timer', () => {
    component.now$.subscribe(date => expect(date instanceof Date).toBe(true));
    component.ngOnInit();
  });

  it('should init the tasks', (done) => {
    // given
    const tasks$ = of([{ id: 'test1', name: 'task1', checked: true, status: Status.blocked },
    { id: 'test2', name: 'task2', checked: false, status: Status.blocked }
    ]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.ngOnInit();
    component.doneTasks$.subscribe((data) => {   
      // then
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('task1'); 
      expect(component.tasks$).toEqual(tasks$);
    done();
    });
  });

  it('should reload the tasks after task creation', () => {
    // given
    const tasks$ = of([{ id: 'test1', name: 'task1', checked: true, status: Status.blocked },
    { id: 'test2', name: 'task2', checked: false, status: Status.blocked }
    ]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.created();
    component.doneTasks$.subscribe((data) => {   
      // then
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('task1'); 
      expect(component.tasks$).toEqual(tasks$);    
      expect(taskService.getAll).toHaveBeenCalled();

    });
  });

  it('should reload the tasks after task deletion', () => {
    // given
    const tasks$ = of([{ id: 'test1', name: 'task1', checked: true, status: Status.blocked },
    { id: 'test2', name: 'task2', checked: false, status: Status.blocked }
    ]);
    taskService.getAll.and.returnValue(tasks$);

    // when
    component.deleted();
    component.doneTasks$.subscribe((data) => {   
      // then
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('task1'); 
      expect(component.tasks$).toEqual(tasks$);
      expect(taskService.getAll).toHaveBeenCalled();
    });
  });
});
