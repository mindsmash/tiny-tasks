/**
 * A tiny task.
 */
export interface Task {
  id: string;
  name: string;
  checked: boolean;
  status: Status;

}
/**
 * enum with none, inProgress and blocked
 */
export enum Status {
  none,
  inProgress,
  blocked
}
