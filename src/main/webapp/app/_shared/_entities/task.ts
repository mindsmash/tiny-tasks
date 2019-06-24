/**
 * A tiny task.
 */
export class Task {
  id: string;
  name: string;
  status: string;
  username: string;


  constructor(id: string, name: string, status: string, username: string) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.username = username;
  }

}
