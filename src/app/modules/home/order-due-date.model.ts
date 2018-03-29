import { Customer } from "@modules/customer/customer.model";

export interface DueDate {
  id: string;
  description: string;
  status: string;
  created_at: string;
  due_date: string;
  price: number;
  paid_amount: number;
  customer?: Customer
}
