import { DoneListComponent } from "./done-list.component";
import { Status } from '../task';
import { of } from 'rxjs';

describe('DoneListComponent', () => {
  let mockedTaskService;
  let doneListComponent;
let mockedEvent = {
  container: {
    data: [{id: 'test1', name: 'Todo1', checked: false, status: Status.inProgress},
    {id: 'test2', name: 'Todo2', checked: true, status: Status.blocked},
    {id: 'test3', name: 'Todo3', checked: false, status: Status.inProgress}]
  },
  previousContainer: {
    data: [{id: 'test1', name: 'done1', checked: false, status: Status.inProgress},
    {id: 'test2', name: 'done2', checked: false, status: Status.blocked}]
  },
  previousIndex: 1,
  currentIndex:0
};
  beforeEach(() => {
    mockedTaskService = jasmine.createSpyObj('mockedTaskService', ['delete','markAsDone']);
    doneListComponent = new DoneListComponent(mockedTaskService);
});
it('should delete a task', () => {
  mockedTaskService.delete.and.returnValue(of(null));
  spyOn(doneListComponent.deleted, 'emit');
  doneListComponent.delete({id: 'test', name: 'Todo1', checked: false, status: Status.inProgress});
  expect(mockedTaskService.delete).toHaveBeenCalledWith('test');
  expect(doneListComponent.deleted.emit).toHaveBeenCalled();

});
it('should drop a dragged element from todoList to done list', () => {
  mockedTaskService.markAsDone.and.returnValue(of({}));
  spyOn(doneListComponent.checked, 'emit');
  doneListComponent.drop(mockedEvent);
  expect(mockedEvent.container.data).toContain(jasmine.objectContaining(    
    {id: 'test2', name: 'done2', checked: false, status: Status.blocked}
    ));
  expect(mockedTaskService.markAsDone).toHaveBeenCalledWith('test2');
  expect(mockedEvent.previousContainer.data.length).toBe(1);
  expect(mockedEvent.container.data.length).toBe(4);
  expect(doneListComponent.checked.emit).toHaveBeenCalled();

});


});