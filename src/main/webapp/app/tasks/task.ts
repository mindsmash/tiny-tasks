/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  status: Status;
}

// Here I've tried to have a single source of truth for status type and also the statuses list - better approach is to save statuses in the db
export const ALL_STATUSES = ['New', 'In Progress', 'Blocked', 'Done'] as const;
type ALL_STATUSES_TYPE = typeof ALL_STATUSES;
export type Status = ALL_STATUSES_TYPE[number];
