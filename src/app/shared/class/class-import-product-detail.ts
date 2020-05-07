import { commonClass } from './class-commondto';
export interface ImportProductDetails extends commonClass {
  id: number;
  productId: number;
  productName: string;
  companyId: number;
  companyName: string;
  supplierId: number;
  supplierName: string;
  price: number;
  discount: number;
  qty: number;
  total: number;
  currencyCode: string;
  description: string;
}
