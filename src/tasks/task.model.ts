export interface ITask {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  time: Date;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
