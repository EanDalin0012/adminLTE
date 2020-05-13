import { commonClass } from './class-commondto';

export interface Product extends commonClass {
  proId: number;
  subCateId: number;
  proName: string;
  resourceFileInfoId: string;
  description: string;
}
