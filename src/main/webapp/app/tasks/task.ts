/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  dueDate?: Date | null | string;
}
