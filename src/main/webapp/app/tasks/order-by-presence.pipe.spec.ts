import { TestBed } from '@angular/core/testing';
import { OrderByPresencePipe } from './order-by-presence.pipe';
import { Task } from './task';

describe('OrderByPipe', () => {

  let orderByPresencePipe: OrderByPresencePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderByPresencePipe]
    });

    orderByPresencePipe = TestBed.get(OrderByPresencePipe);
  });

  it('create an instance', () => {
    expect(orderByPresencePipe).toBeTruthy();
  });

  it('should handle unexpected parameters correctly', () => {
    let result = orderByPresencePipe.transform(undefined, 'someProperty');
    expect(result).toEqual([]);
  });

  it('should return the same array for array with one element', () => {
    const task: Task = { id: 'some-id', name: 'some-name' };
    let result = orderByPresencePipe.transform([task], 'name');
    expect(result).toEqual([task]);
  });

  it('should return the array when there are some values in array', () => {
    let dueDate1 = new Date(); dueDate1.setDate(dueDate1.getDate() + 1);
    let dueDate2 = new Date(); dueDate2.setDate(dueDate2.getDate() + 2);
    const tasks: Task[] = [
      { id: '3', name: 'test', dueDate: dueDate1 },
      { id: '1', name: 'test' },
      { id: '2', name: 'test', dueDate: dueDate2 }
    ];
    let result = orderByPresencePipe.transform(tasks, 'name');
    expect(result).toEqual([
      { id: '3', name: 'test', dueDate: dueDate1 },
      { id: '2', name: 'test', dueDate: dueDate2 },
      { id: '1', name: 'test' }
    ]);
  });
});
