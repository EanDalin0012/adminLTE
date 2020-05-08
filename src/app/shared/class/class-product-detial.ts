import { commonClass } from './class-commondto';
export interface ProductDetail extends commonClass {
  productId: number;
  productName: string;
  subCategoryId: number;
  subCategoryName: string;
  description: string;
}
