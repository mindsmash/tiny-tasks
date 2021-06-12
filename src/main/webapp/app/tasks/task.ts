/**
 * A tiny task.
 */
import {FileAttachement} from 'app/tasks/fileAttachement';

export interface Task {
  id: string;
  name: string;
  files: FileAttachement[];
}
