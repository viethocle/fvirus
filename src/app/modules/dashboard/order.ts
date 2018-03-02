import { Customer } from '@modules/customer/customer.model';

export enum StatusOrder {
  new         = 'new',
  ready       = 'ready',
  inprogress  = 'inprogress',
  closed      = 'closed'
}

export class Order {
  id: string;
  description: string;
  status: StatusOrder;
  due_date: string;
  customer: Customer
}
