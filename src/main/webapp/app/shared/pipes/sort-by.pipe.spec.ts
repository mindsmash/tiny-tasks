import { Task } from 'app/tasks/task';
import { SortByPipe } from './sort-by.pipe';

describe('SortByPipe', () => {

  let pipe: SortByPipe;

  const array: Task[] = [
    { id: '8eaaa710-404a-40ad-8e46-a03924609d0c', name: 'Walk the dog 3', dueDate: '2021-09-23T07:41:24.000Z' } as Task,
    { id: 'c31865e8-24f5-4e9f-a518-00ecb3659e3c', name: 'Walk the dog 2', dueDate: '2021-09-17T19:41:33.000Z' } as Task,
    { id: 'f0925731-b09e-4722-8904-8d8db6173379', name: 'Walk the dog 1', dueDate: '2021-09-08T19:41:38.000Z' } as Task,
    { id: '0c4849a6-c4be-4e73-a046-62bab45cd885', name: 'Walk the dog 4', dueDate: null } as Task,
    { id: '3d4218ce-6d42-4326-a971-8cab84c71336', name: 'Walk the dog 5', dueDate: null } as Task,
  ];

  beforeEach(() => {
    pipe = new SortByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('both arrays should be equal', () => {
    const oldTasks = [...array];

    // when
    const result = pipe.transform(array);

    // then
    expect(result).toEqual(oldTasks);
  });

  it('should sort the array by date', () => {
    // when
    const sortedArray = pipe.transform(array, 'dueDate');

    // then
    expect(sortedArray[0].name).toEqual('Walk the dog 1');
    expect(sortedArray[1].name).toEqual('Walk the dog 2');
    expect(sortedArray[sortedArray.length - 1].dueDate).toEqual(null);
  });

  it('should sort the array by date after inserting a task', () => {
    const newArray = [...array];
    newArray.push({
      id: '5269b9ff-4a19-4393-9a85-6748d1c1e7b2',
      name: 'Feed the dog 0',
      dueDate: '2021-08-01T07:41:24.000Z'
    } as Task);
    newArray.push({
      id: 'c959685a-6cd7-4575-8968-705ac70f4499',
      name: 'Finish walking the dog',
      dueDate: null
    } as Task);
    // when
    pipe.transform(newArray, 'dueDate');

    // then
    expect(newArray[0].name).toEqual('Feed the dog 0');
    expect(newArray[newArray.length - 1].dueDate).toEqual(null);
  });
});
