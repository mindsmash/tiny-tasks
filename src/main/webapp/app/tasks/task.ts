/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  checked: boolean;
  status: Status;

}
export enum Status {
  none,
  inProgress,
  blocked
}
