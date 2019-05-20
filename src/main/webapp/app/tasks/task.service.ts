import { Observable } from 'rxjs';

import { Task } from './task';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(): Observable<Task[]>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @returns an `Observable` holding the created task
   */
  create(name: string): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Change Task Category
   *
   * @param taskId the ID of the task to be modified
   * @param categoryId the ID of the category to be changed
   * @returns an `Observable` holding the changed task
   */
  changeCategory(taskId: string, categoryId: string): Observable<Task>;

  /**
   * Delete all tasks marked by done
   *
   * @returns an empty `Observable`
   */
  deleteAllDoneTasks(): Observable<void>


  /**
   * Delete all tasks marked by done
   *
   * @param categoryId the ID of the category
   * @returns an empty `Observable`
   */
  getTasksByCategory(categoryId: String) : Observable<Task[]>
}
