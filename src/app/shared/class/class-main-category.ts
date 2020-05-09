import { commonClass } from './class-commondto';

export interface MainCategory extends commonClass {
  id: number;
  mainCategoryName: string;
  description: string;
}
