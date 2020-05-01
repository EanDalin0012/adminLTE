import { commonClass } from './class-commondto';

export interface SubCategoryDetail extends commonClass {
    subCatId: number;
    mainCatId: number;
    subCatName: string;
    mainCatName: string;
    description: string;
}
