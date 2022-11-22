/**
 * A tiny task.
 */
import { Status } from './status';

export interface Task {
  id: string;
  name: string;
  status: Status;
}
