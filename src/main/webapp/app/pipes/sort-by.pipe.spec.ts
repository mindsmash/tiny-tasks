import { Task } from 'app/tasks/task';
import { SortByPipe } from './sort-by.pipe';

describe('SortByPipe', () => {

  let pipe: SortByPipe;

  const array: Task[] = [
    { id: "3938dbc1-df2f-42b4-8863-74ab8083f545", name: "Drink water", date: "2021-08-19T16:00:00.000Z" },
    { id: "043779f4-645d-4c76-898a-d175bff209c8", name: "Drink more water", date: "2021-09-19T16:00:00.000Z" }
  ];

  beforeEach(() => {
    pipe = new SortByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same array', () => {
    const oldTasks = [...array];

    // when
    const result = pipe.transform(array);

    // then
    expect(result).toEqual(oldTasks);
  });

  it('should sort the array by date', () => {
    // when
    const newArray = pipe.transform(array, 'date');
  
    const [first] = newArray;

    // then
    expect(first.id).toEqual('043779f4-645d-4c76-898a-d175bff209c8');
  });

  beforeEach(() => {
    array.unshift({
      id: '718decbd-e9e2-44ce-af7f-0ac8428d55f5',
      name: 'Watch Netflix',
      date: ''
    });
  })

  it('should sort the array by date after insert a task', () => {
    // when
    pipe.transform(array, 'date');

    const last = array[array.length - 1];

    // then
    expect(last.id).toEqual('718decbd-e9e2-44ce-af7f-0ac8428d55f5');
  });
});
