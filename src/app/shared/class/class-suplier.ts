import { commonClass } from './class-commondto';

export interface Supplier extends commonClass {
  id: number;
  supName: string;
  supContact: string;
  supContactTwo: string;
  supEmail: string;
  description: string;
}
