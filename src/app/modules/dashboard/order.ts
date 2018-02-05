
export enum StatusOrder {
  new         = 'new',
  ready       = 'ready',
  inprogress  = 'inprogress',
  closed      = 'closed'
}

export interface Order {
  id: number;
  description: string;
  status: StatusOrder;
  due_date: string;
}
