import {TaskSearchFilterPipe} from './task-search-filter.pipe';

describe('TaskSearchFilterPipe', () => {
  const task1 = JSON.parse('{"id":"1","name":"Doing the thing"}');
  const task2 = JSON.parse('{"id":"2","name":"Coding the code"}');
  const task3 = JSON.parse('{"id":"3","name":"Fixing the fix"}');
  const tasks = [task1, task2, task3];

  let pipe;

  beforeEach(() => {
    pipe = new TaskSearchFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filter with OR', () => {
    const query = 'thing OR code';
    const filteredTasks = pipe.transform(tasks, query);
    expect(filteredTasks.length).toBe(2);
    expect(filteredTasks.includes(task1)).toBe(true);
    expect(filteredTasks.includes(task2)).toBe(true);
  });

  it('filter with AND valid', () => {
    const query = 'and OR thing';
    const filteredTasks = pipe.transform(tasks, query);
    expect(filteredTasks.length).toBe(1);
    expect(filteredTasks.includes(task1)).toBe(true);
  });

  it('filter with AND empty', () => {
    const query = 'thing AND code';
    const filteredTasks = pipe.transform(tasks, query);
    expect(filteredTasks.length).toBe(0);
  });

  it('filter with multiple operators', () => {
    const query = 'doing OR coding AND code'; // AND has precedence
    const filteredTasks = pipe.transform(tasks, query);
    expect(filteredTasks.length).toBe(2);
    expect(filteredTasks.includes(task1)).toBe(true);
    expect(filteredTasks.includes(task2)).toBe(true);

  });

  it('empty search', () => {
    const query = ''; // AND has precedence
    const filteredTasks = pipe.transform(tasks, query);
    expect(filteredTasks.length).toBe(3);
    expect(filteredTasks.includes(task1)).toBe(true);
    expect(filteredTasks.includes(task2)).toBe(true);
    expect(filteredTasks.includes(task3)).toBe(true);
  });
});
