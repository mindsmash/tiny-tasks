import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {DataType} from '../_model/datatype';
import {Category} from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private baseService: BaseService) {
  }

  getAll(search: string, orderField: string) {
    return this.baseService.get(DataType.CATEGORY, search, orderField);
  }

  add(category) {
    this.baseService.add(DataType.CATEGORY, category);
  }

  update(category) {
    this.baseService.update(DataType.CATEGORY, category);
  }

  delete(id) {
    this.baseService.delete(DataType.CATEGORY, id);
  }
}
