export enum Status {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE',
}

export const StatusLabelMap: { [key in Status]: string } = {
  NEW: 'New',
  IN_PROGRESS: 'In Progress',
  BLOCKED: 'Blocked',
  DONE: 'Done',
};

export const StatusChipClassMap: { [key in Status]: string } = {
  NEW: 'new-chip',
  IN_PROGRESS: 'in-progress-chip',
  BLOCKED: 'blocked-chip',
  DONE: 'done-chip',
};
