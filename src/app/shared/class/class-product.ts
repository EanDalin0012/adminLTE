import { commonClass } from './class-commondto';

export interface Product extends commonClass {
  proId: number;
  subCateId: number;
  companyId: number;
  proName: string;
  price: number;
  unitPrice: number;
  discount: number;
  afterDiscountPrice: number;
  description: string;
}
