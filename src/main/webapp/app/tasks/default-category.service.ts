import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Category } from './category'
import { map } from 'rxjs/operators';
import { CategoryService } from './category.service';

@Injectable()
export class DefaultCategoryService implements CategoryService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + '/categories');
  }

  create(name: string): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + '/categories', {id: name} as Category);
  }

}
