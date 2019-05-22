import { Observable } from 'rxjs';

import { Category } from './category';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface CategoryService {


  /**
   * Returns the list of all categories.
   *
   * @returns an `Observable` holding the list of categories
   */

  getAll(): Observable<Category[]>


  /**
   * Adds a new category to the list of categories.
   *
   * @param name the category's name
   * @returns an `Observable` holding the created category
   */
  create(name: string): Observable<Category>

  /**
   * Removes the category with the given ID from the list of categories.
   *
   * @param id the ID of the category to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;
}
