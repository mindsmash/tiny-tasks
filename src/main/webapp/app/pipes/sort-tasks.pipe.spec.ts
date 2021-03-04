import { Task } from 'app/tasks/task';
import { SortTasksPipe } from './sort-tasks.pipe';

describe('SortTasksPipe', () => {
  const id1 = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
  const name1 = 'Doing the do! 1';
  const mockTask1: Task = { id: id1, name: name1, done: false };

  const id2 = 'de4f576e-d1b5-488a-8c77-63d4c8726777';
  const name2 = 'Doing the do! 2';
  const mockTaskDone: Task = { id: id2, name: name2, done: true };

  const id3 = 'de4f576e-d1b5-488a-8c77-63d4c8726555';
  const name3 = 'Doing the do! 3';
  const mockTaskDone2: Task = { id: id3, name: name3, done: true };

  const pipe = new SortTasksPipe();

  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('puts done task to bottom', () => {
    expect(pipe.transform([mockTask1, mockTaskDone, mockTaskDone2])).toEqual([mockTask1, mockTaskDone, mockTaskDone2]);
    expect(pipe.transform([mockTaskDone, mockTask1, mockTaskDone2])).toEqual([mockTask1, mockTaskDone, mockTaskDone2]);
    expect(pipe.transform([mockTaskDone2, mockTaskDone, mockTask1])).toEqual([mockTask1, mockTaskDone2, mockTaskDone]);
  });
});
