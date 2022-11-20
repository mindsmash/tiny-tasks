export enum TaskStatus {
  BLOCKED = 'blocked',
  DEFAULT = 'default',
  DONE = 'done',
  PROGRESS = 'progress',
}

/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  isMarked?: boolean;
  status?: TaskStatus;
  ui?: any;
}
