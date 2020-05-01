import { commonClass } from './class-commondto';

export class Supplying extends commonClass {
  id: number;
  supplierId: number;
  productId: number;
  quantity: number;
  orderedAt: string;
  arrivesAt: string;
  arrived: boolean;
  description: string;
}
