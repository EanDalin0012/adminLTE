import { commonClass } from './class-commondto';

export interface Category extends commonClass {
  id: number;
  categoryName: string;
  description: string;
}
