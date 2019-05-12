import { Moment } from 'moment';

/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  due?: Moment;
}
