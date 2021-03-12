import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskFormDialogComponent } from './task-form-dialog.component';

describe('TaskFormDialogComponent', () => {
  let component: TaskFormDialogComponent;
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' };
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let matDialog: MatDialog;
  let taskService: jasmine.SpyObj<TaskService>;
  let task: Task = {id: 'id', name: 'Listen to Vivaldi Summer season at winter'};

  beforeEach(async () => {
    taskService = jasmine.createSpyObj('taskService', ['update']);
    await TestBed.configureTestingModule({
      declarations: [TaskFormDialogComponent],
      imports: [MatDialogModule],
      providers: [{
        provide: 'TaskService',
        useValue: taskService
      }, {
        provide: MAT_DIALOG_DATA,
        useValue: { task: task }
      }, {
        provide: MatBottomSheet,
        useValue: {}
      }, {
        provide: MatDialogRef,
        useValue: dialogRefSpyObj
      }]
    }).overrideTemplate(TaskFormDialogComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    matDialog = TestBed.inject(MatDialog);
    dialogSpy = spyOn(matDialog, 'open').and.returnValue(dialogRefSpyObj);
    fixture = TestBed.createComponent(TaskFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open', () => {
    matDialog.open(TaskFormDialogComponent);
    expect(dialogSpy).toHaveBeenCalled();
  });
  
  it('should close and return updated task', () => {
    // given
    const updatedTask = { id: 'id', name: 'Don\'t read Kafka The Metamorphosis' }
    taskService.update.and.returnValue(of(updatedTask));

    // when
    component.submit();

    // then
    expect(dialogRefSpyObj.close).toHaveBeenCalledWith(updatedTask);
  });
});
