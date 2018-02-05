
export enum Status {
  new         = 'new',
  ready       = 'ready',
  inprogress  = 'inprogress',
  closed      = 'closed'
}

export interface Order {
  id: number;
  description: string;
  status: Status;
  due_date: string;
}
