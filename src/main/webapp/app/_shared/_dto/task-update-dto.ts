/**
 * A tiny task.
 */
export class TaskUpdateDto {
  id: string;
  name: string;
  status: string;
  username: string;

  constructor(name: string, status: string, username: string) {
    this.name = name;
    this.status = status;
    this.username = username;
  }
}
