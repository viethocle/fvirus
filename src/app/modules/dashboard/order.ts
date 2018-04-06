import { Customer } from '@modules/customer/customer.model';

export enum StatusOrder {
  new         = 'new',
  ready       = 'ready',
  inprogress  = 'inprogress',
  delivered   = 'delivered'
}

export interface Order {
  id: string;
  description: string;
  status: StatusOrder;
  created_at: string;
  due_date: string;
  delivered_at: string;
  price: number;
  paidAmount?: number;
  customer?: Customer;
}
