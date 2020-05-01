import { commonClass } from './class-commondto';

export interface SubCategory extends commonClass {
  id: number;
  mainCategoryId: number;
  subCategoryName: string;
  description: string;
}
