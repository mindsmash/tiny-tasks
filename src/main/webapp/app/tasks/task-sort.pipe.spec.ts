import {TaskSortPipe} from './task-sort.pipe';

describe('TaskSortPipe', () => {

  const mockTaskNotDone = {id: 'b69cca4a-c0f0-46bc-9c02-786b2d254bcd', name: 'Task not done', done: false};
  const mockTaskDone1 = {id: '01bab290-b26b-4218-a5a2-a4f8c8863338', name: 'Task 2 done', done: true};
  const mockTaskDone2 = {id: '92117362-810e-4965-8987-7837f8ca92b2', name: 'Task 3 done', done: true};


  it('create an instance', () => {
    const pipe = new TaskSortPipe();
    expect(pipe).toBeTruthy();
  });

  it('done task at the bottom of the lsit', () => {
    const pipe = new TaskSortPipe();
    expect(pipe.transform([mockTaskNotDone, mockTaskDone1, mockTaskDone2])).toEqual([mockTaskNotDone, mockTaskDone1, mockTaskDone2]);
    expect(pipe.transform([mockTaskDone1, mockTaskNotDone, mockTaskDone2])).toEqual([mockTaskNotDone, mockTaskDone1, mockTaskDone2]);
    expect(pipe.transform([mockTaskDone2, mockTaskDone1, mockTaskNotDone])).toEqual([mockTaskNotDone, mockTaskDone2, mockTaskDone1]);
  });
});
