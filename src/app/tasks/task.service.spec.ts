import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from 'src/domain/Task';

describe('TaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskService = TestBed.get(TaskService);
    expect(service).toBeTruthy();
  });

  it('should add a task', () => {
    const service: TaskService = TestBed.get(TaskService);
    const task: Task = new Task();
    task.text = 'New Title Task';
    task.description = 'New Description Task';
    service.add(task);

    expect(service.tasks[0].text).toContain('New Title Task');
  });

  it('should remove a task', () => {
    const service: TaskService = TestBed.get(TaskService);
    const task: Task = new Task();
    task.text = 'New Title Task';
    task.description = 'New Description Task';
    service.add(task);
    service.remove(0);

    expect(service.tasks.length).toEqual(0);
  });

  it('should clear all tasks', () => {
    const service: TaskService = TestBed.get(TaskService);
    const task: Task = new Task();
    task.text = 'New Title Task';
    task.description = 'New Description Task';
    service.add(task);
    service.clear();

    expect(service.tasks.length).toEqual(0);
  });

  it('should close a open task', () => {
    const service: TaskService = TestBed.get(TaskService);
    const task: Task = new Task();
    task.text = 'New Title Task';
    task.description = 'New Description Task';
    service.add(task);

    service.close(task);

    expect(task.finished).toEqual(true);
  });

  it('should reopen a close task', () => {
    const service: TaskService = TestBed.get(TaskService);
    const task: Task = new Task();
    task.text = 'New Title Task';
    task.description = 'New Description Task';
    service.add(task);

    service.reopen(task);

    expect(task.finished).toEqual(false);
  });
});
