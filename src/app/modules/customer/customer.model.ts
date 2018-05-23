import { Group } from './group.model';
export class Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  groups: Group[];
}
