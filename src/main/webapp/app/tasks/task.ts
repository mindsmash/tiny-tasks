/**
 * A tiny task.
 */
import {FileAttachment} from 'app/tasks/fileAttachment';

export interface Task {
  id: string;
  name: string;
  files: FileAttachment[];
}
