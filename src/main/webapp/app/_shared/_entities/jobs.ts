/**
 * A tiny task.
 */

export class Jobs {
  id: string;
  schedule: string;
  dueDate: Date;
  username: string;

  constructor(id: string, schedule: string, dueDate: Date, username: string) {
    this.id = id;
    this.schedule = schedule;
    this.dueDate = dueDate;
    this.username = username;
  }
}
