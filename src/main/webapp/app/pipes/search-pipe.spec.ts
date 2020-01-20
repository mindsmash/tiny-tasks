import { Task } from 'app/tasks/task';
import { SearchPipe } from './search-pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;
  beforeEach(() => {
    pipe = new SearchPipe();
  });

  const tasks: Task[] = [{id: '2', name: 'hey'}, {id: '3', name: 'change filter'}];

  it('should return the search value when a search value is inputted', () => {
    expect(pipe.transform(tasks, 'hey')).toEqual([{id: '2', name: 'hey'}]);
  });

  it('should return the tasks when no search value is inputted', () => {
    expect(pipe.transform(tasks, '')).toEqual(tasks);
    expect(pipe.transform(tasks, null)).toEqual(tasks);
    expect(pipe.transform(tasks, undefined)).toEqual(tasks);

  });
  it('should return an empty array when there are no tasks', () => {
    expect(pipe.transform(null, 'hey')).toEqual([]);
  });

});
