import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {DataType} from '../_model/datatype';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private baseService: BaseService) {
  }

  getAll(search: string, orderField: string) {
    return this.baseService.get(DataType.TASK, search, orderField);
  }

  add(task) {
    this.baseService.add(DataType.TASK, task);
  }

  update(task) {
    this.baseService.update(DataType.TASK, task);
  }

  delete(id) {
    this.baseService.delete(DataType.TASK, id);
  }
}
