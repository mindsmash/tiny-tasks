import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {of} from 'rxjs';

import {TaskService} from '../task.service';
import {TaskListComponent} from './task-list.component';
import {HttpResponse} from "@angular/common/http";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['delete','downloadFile'])
      }]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', fileName: null});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', fileName: null});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', fileName: null});
  });

  it('should download task attachment', () => {
    // given
    taskService.downloadFile.and.returnValue(of(null));

    // when
    component.downloadFile({id: 'id', name: 'My task', fileName: "1.txt"});

    // then
    expect(taskService.downloadFile).toHaveBeenCalledWith('1.txt');
  });

  it('should emit the task after download', () => {
    // given
    taskService.downloadFile.and.returnValue(of(new HttpResponse({
      body:null,
      status:200,
    })));

    const downloadEmmitter = spyOn(component.downloaded, 'emit');

    // when
    component.downloadFile({id: 'id', name: 'My task', fileName: "1.txt"});

    // then
    expect(downloadEmmitter).toHaveBeenCalledWith({id: 'id', name: 'My task', fileName: "1.txt"});
  });

});
