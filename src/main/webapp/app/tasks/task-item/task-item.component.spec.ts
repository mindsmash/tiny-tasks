import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskItemComponent } from './task-item.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let data = MAT_DIALOG_DATA;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      imports: [MatDialogModule],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['create'])
      },
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: data }]
    }).overrideTemplate(TaskItemComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService', MatDialogRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO provide more test cases to trigger the updated info
});
