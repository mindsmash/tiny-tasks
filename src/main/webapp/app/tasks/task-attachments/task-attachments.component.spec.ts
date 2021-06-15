import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TaskAttachmentsComponent} from './task-attachments.component';
import {TaskService} from 'app/tasks/task.service';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

describe('TaskAttachmentsComponent', () => {
  let component: TaskAttachmentsComponent;
  let fixture: ComponentFixture<TaskAttachmentsComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let debugElement: DebugElement;
  const task = {id: 'id', name: 'My task', files: []};
  const file = {id: 'file-id', name: 'file', type: 'file-type'};


  beforeEach(async () => {
    taskService = jasmine.createSpyObj('taskService', ['attachFile', 'getFile', 'deleteFile']);
    await TestBed.configureTestingModule({
      declarations: [TaskAttachmentsComponent],
      providers: [{
        provide: 'TaskService',
        useValue: taskService,
      }],
      imports: [
        MatInputModule,
        MatListModule,
        MatIconModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAttachmentsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attach a file', () => {
    // given
    taskService.attachFile.and.returnValue(of(null));
    const inputField = debugElement.query(By.css('input'));
    const inputFieldNE: HTMLElement = inputField.nativeElement as HTMLElement;
    const event = new Event('change', {bubbles: true, cancelable: false});
    inputFieldNE.dispatchEvent(event);
    fixture.detectChanges();

    // when
    component.onFileSelected(event, task);

    // then
    expect(taskService.attachFile).toHaveBeenCalled();
  });

  it('should emit after attaching', () => {
    // given
    taskService.attachFile.and.returnValue(of(null));
    const attachEmitter = spyOn(component.fileAttached, 'emit');
    const inputField = debugElement.query(By.css('input'));
    const inputFieldNE: HTMLElement = inputField.nativeElement as HTMLElement;
    const event = new Event('change', {bubbles: true, cancelable: false});
    inputFieldNE.dispatchEvent(event);
    fixture.detectChanges();

    // when
    component.onFileSelected(event, task);

    // then
    expect(attachEmitter).toHaveBeenCalled();
  });

  it('should download a file', () => {
    // given
    taskService.getFile.and.returnValue(of(null));

    // when
    component.downloadFile(task, file);

    // then
    expect(taskService.getFile).toHaveBeenCalledWith(task.id, file.id);
  });

  it('should delete a file', () => {
    // given
    taskService.deleteFile.and.returnValue(of(null));

    // when
    component.deleteFile(task, file);

    // then
    expect(taskService.deleteFile).toHaveBeenCalledWith(task.id, file.id);
  });

  it('should emit the file after deletion', () => {
    // given
    taskService.deleteFile.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.fileDetached, 'emit');

    // when
    component.deleteFile(task, file);

    // then
    expect(deleteEmitter).toHaveBeenCalledWith(file);
  });
});
