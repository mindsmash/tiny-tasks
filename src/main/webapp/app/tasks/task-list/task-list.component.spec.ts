import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {of} from 'rxjs';

import {TaskService} from '../task.service';
import {TaskListComponent} from './task-list.component';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Task} from "../task";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {EventEmitter} from "@angular/core";

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let modalService: jasmine.SpyObj<NgbModal>


  beforeEach(waitForAsync(() => {
    taskService = jasmine.createSpyObj('TaskService', ['delete', 'updateDueDate']);
    modalService = jasmine.createSpyObj('NgbModal', ['dismissAll', 'open']);

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: 'TaskService', useValue: taskService},
        {provide: 'NgbModal', useValue: modalService},
        FormBuilder
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.updated = new EventEmitter<Task>();
    spyOn(component.updated, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit the task after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(void 0));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task'});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith({id: 'id', name: 'My task'});
  });

  describe('updateDueDate function', () => {
    it('should update due date and emit updated task', () => {
      // given
      const taskId: string = 'task-id';
      const dueDate: string = '2030-06-10';
      const initialTask = new Task();
      initialTask.id = taskId;
      initialTask.dueDate = dueDate;
      component.selectedTask = initialTask;

      const formValue = { dueDate: dueDate };
      component.form.setValue(formValue);
      const updatedTask = new Task();
      updatedTask.id = taskId;
      updatedTask.dueDate = dueDate;

      taskService.updateDueDate.and.returnValue(of(void 0));

      // when
      component.updateDueDate();

      // then
      expect(taskService.updateDueDate).toHaveBeenCalledWith(taskId, dueDate);
      expect(component.updated.emit).toHaveBeenCalledWith(updatedTask);
      expect(component.selectedTask.id).toBe(taskId);
      expect(component.selectedTask.dueDate).toBe(dueDate);
    });

    it('should show alert when due date is past', () => {
      // given
      const dueDate = '2020-06-10';
      const formValue = {dueDate: dueDate};
      component.form.setValue(formValue);

      spyOn(window, 'alert');

      // when
      component.updateDueDate();

      // then
      expect(window.alert).toHaveBeenCalledWith('Please fill out the form correctly.');
    });
  });

  describe('stringToDate function', () => {
    it('should return current date if input is empty string', () => {
      // given
      const emptyDateString = '';

      // when
      const result = component.stringToDate(emptyDateString);

      // then
      expect(result).toEqual(new Date().toISOString().split('T')[0]);
    });

    it('should return current date if input is null', () => {
      // given

      // when
      const result = component.stringToDate('');

      // then
      expect(result).toEqual(new Date().toISOString().split('T')[0]);
    });

    it('should return formatted date if input is in valid format with < 10 month and day', () => {
      // given
      const validDateString = [2024, 6, 3];
      const expectedDate = '2024-06-03';

      // when
      const result = component.stringToDate(validDateString);

      // then
      expect(result).toEqual(expectedDate);
    });

    it('should return formatted date if input is in valid format with > 10 month and day', () => {
      // given
      const validDateString = [2024, 11, 11];
      const expectedDate = '2024-11-11';

      // when
      const result = component.stringToDate(validDateString);

      // then
      expect(result).toEqual(expectedDate);
    });
  });

  describe('isPastDate', () => {
    it('should return true if selected date is in the past', () => {
      // given
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const pastDateString = pastDate.toISOString();
      // when
      const result = component.isPastDate(pastDateString);

      // then
      expect(result).toBe(true);
    });

    it('should return false if selected date is today or in the future', () => {
      // given
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const futureDateString = futureDate.toISOString();

      // when
      const result = component.isPastDate(futureDateString);

      // then
      expect(result).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      // given
      const date = new Date('2024-06-03');
      const expectedFormattedDate = '03/06/2024';

      // when
      const formattedDate = component.formatDate(date);

      // then
      expect(formattedDate).toBe(expectedFormattedDate);
    });

    it('should return "No Due Date Assigned" if input date is falsy', () => {
      // given
      const date = null;

      // when
      const formattedDate = component.formatDate(date);

      // then
      expect(formattedDate).toBe('No Due Date Assigned');
    });
  });

  it('should open due date popup with correct values', () => {
    // given
    const task: Task = {id: 'task-id', dueDate: ''};
    const content = '<div></div>';
    const expectedDueDate = new Date().toISOString().split('T')[0];

    // when
    component.openDueDatePopUp(task, {content});

    // then
    expect(component.selectedTask).toEqual(task);
    expect(component.form.value.dueDate).toBe(expectedDueDate);
  });
});
