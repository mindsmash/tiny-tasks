import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TaskService} from '../task.service';
import {TaskDeleteCompletedComponent} from './task-delete-completed.component';

describe('TaskDeleteCompletedComponent', () => {
    let component: TaskDeleteCompletedComponent;
    let fixture: ComponentFixture<TaskDeleteCompletedComponent>;
    let taskService: jasmine.SpyObj<TaskService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TaskDeleteCompletedComponent],
            providers: [{
                provide: 'TaskService',
                useValue: jasmine.createSpyObj('taskService', ['delete'])
            }]
        }).overrideTemplate(TaskDeleteCompletedComponent, '')
            .compileComponents();

        taskService = TestBed.get('TaskService');
    }));
});
