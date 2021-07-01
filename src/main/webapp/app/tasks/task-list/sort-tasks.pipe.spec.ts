import {DEFAULT_TASK_STATUS_ORDER, SortTasksPipe} from './sort-tasks.pipe';
import {Task, TaskStatus} from "app/tasks/task";

describe('SortTasksPipe', () => {
  it('create an instance', () => {
    const pipe = new SortTasksPipe();
    expect(pipe).toBeTruthy();
  });

  it('should use default sorting order with done on the top if no other order provided', () => {
    const pipe = new SortTasksPipe();
    const tasks: Task[] = [
      { id: '1', name: '1', status: TaskStatus.Blocked },
      { id: '2', name: '2', status: TaskStatus.InProgress },
      { id: '3', name: '3', status: TaskStatus.Done },
      { id: '4', name: '4', status: TaskStatus.Todo },
      { id: '5', name: '5', status: TaskStatus.Cancelled },
    ];
    const result = pipe.transform(tasks).map(({status}: Task) => status);
    expect(result).toEqual(DEFAULT_TASK_STATUS_ORDER);
    expect(result[0]).toBe(TaskStatus.Todo);
  });

  it('should keep perform stable sort (do not change original order)', () => {
    const pipe = new SortTasksPipe();
    const order = [TaskStatus.Todo, TaskStatus.Cancelled, TaskStatus.Blocked];
    const tasks: Task[] = [
      { id: '1', name: '1', status: TaskStatus.Cancelled },
      { id: '2', name: '2', status: TaskStatus.Blocked },
      { id: '3', name: '3', status: TaskStatus.Blocked },
      { id: '4', name: '4', status: TaskStatus.Todo }
    ];
    expect(pipe.transform(tasks, order).map(({id}: Task) => id)).toEqual(['4', '1', '2', '3']);
  });

  it('should leave items not described in order at the end of the list', () => {
    const pipe = new SortTasksPipe();
    const order = [TaskStatus.Todo, TaskStatus.InProgress];
    const tasks: Task[] = [
      { id: '1', name: '1', status: TaskStatus.Blocked },
      { id: '2', name: '2', status: TaskStatus.InProgress },
      { id: '3', name: '3', status: TaskStatus.Done },
      { id: '4', name: '4', status: TaskStatus.Todo },
      { id: '5', name: '5', status: TaskStatus.Cancelled },
    ];
    expect(pipe.transform(tasks, order).slice(0, 2).map(({id}: Task) => id)).toEqual(['4', '2']);
  });
});
