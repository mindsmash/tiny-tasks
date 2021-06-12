import { Observable } from 'rxjs';

import { Task } from 'app/tasks/task';
import {FileAttachement} from 'app/tasks/fileAttachement';

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
   * Downloads the file with the given fileId attached to the task with the given taskId.
   * @param taskId the ID of the task that the file is attached to
   * @param fileId the ID of the file to be downloaded
   */
  getFile(taskId: string, fileId: string): Observable<Blob>;

  attachFile(taskId: string, formData: FormData): Observable<FileAttachement>;

  deleteFile(taskId: string, fileId: string): Observable<void>;
}
