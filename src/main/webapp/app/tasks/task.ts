import { Status } from '../shared/status';

/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  status: Status;
}
