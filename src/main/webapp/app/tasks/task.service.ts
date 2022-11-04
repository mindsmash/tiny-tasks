import { Observable } from 'rxjs';
import { IFilterData } from '../shared/components/filter/utilities/filter.model';
import { ISort } from '../shared/models/sort.model';
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
   * Returns the list of filtered all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getFiltered(filter: IFilterData | undefined, sort: ISort | undefined): Observable<Task[]>;

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
   * Saves edited data of a task.
   *
   * @param taskData the edited task
   * @returns an empty `Observable`
   */
  saveTaskData(taskData: Task): Observable<void>;
}
