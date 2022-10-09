export enum Status {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE',
}

export interface Task {
  id: string;
  name: string;
  status: Status;
}
