import { commonClass } from './class-commondto';
export interface ImportPoduct extends commonClass {
  id: number;
  productId: number;
  supplierId: number;
  companyId: number;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  currencyCode: string;
  description: string;
}

