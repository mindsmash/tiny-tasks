import { SearchPipe } from './search.pipe';

const tasks = [
  {id: '1', name: 'task 1'},
  {id: '2', name: 'task 2'},
  {id: '3', name: 'task 3'}
];

describe('SearchPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all tasks if term is null', () => {
    const result = pipe.transform(tasks, null);

    expect(result).toEqual(tasks);
  })

  it('Should returns just one task matching the needle term', () => {
    const result = pipe.transform(tasks, 'task 2');

    expect(result[0]).toEqual(tasks[1]);
  })

  it('should return empty results if term doesn’t match', () => {
    const result = pipe.transform(tasks, 'test');

    expect(result).toEqual([]);
  })
});
