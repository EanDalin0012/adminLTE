import { commonClass } from './class-commondto';
export interface ImportProductDetails extends commonClass {
  id: number;

  productId: number;
  productName: string;

  supplierId: number;
  supplierName: string;

  companyId: number;
  companyName: string;

  quantity: number;
  price: number;
  discount: number;
  total: number;
  currencyCode: string;
  description: string;
}
