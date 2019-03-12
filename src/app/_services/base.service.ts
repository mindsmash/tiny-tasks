import {Task} from '../_model/task';
import {Injectable} from '@angular/core';
import {Category} from '../_model/category';
import {DataType} from '../_model/datatype';

@Injectable()
export class BaseService {

  taskList: Array<Task> = [
    {id: 1, title: 'Test Task', category: {id: 1, description: 'Test Category'}, status: false}
  ];

  categoryList: Array<Category> = [
    {id: 1, description: 'Test Category'}
  ];

  get(type: DataType, search: string, orderField: string) {
    if (type === DataType.TASK) {
      return this.taskList;
    } else if (type === DataType.CATEGORY) {
      return this.categoryList;
    }
  }

  add(type: DataType, entity: any) {
    if (type === DataType.TASK) {
      this.taskList.push(entity);
    } else if (type === DataType.CATEGORY) {
      return this.categoryList.push(entity);
    }
  }

  update(type: DataType, entity: any) {

  }

  delete(type: DataType, entity: any) {

  }
}
