/**
 * A tiny task.
 */

export class JobsRequest {
  schedule: string;
  username: string;

  constructor(schedule: string, username: string) {
    this.schedule = schedule;
    this.username = username;
  }
}
