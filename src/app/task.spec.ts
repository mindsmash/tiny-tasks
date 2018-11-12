import {Task} from './task';

describe('Task', () => {
  it('should create an instance of Task', () => {
    expect(new Task()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let task = new Task({
      text: 'task1',
      complete: false
    });
    expect(task.text).toEqual('task1');
    expect(task.complete).toEqual(false);
  });
});
