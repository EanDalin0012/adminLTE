import { Header } from '../Class/class-header';
import { SubCategory } from '../Class/class-sub-category';
export class SubCategoryList {
  header: Header;
  body = {
    list: new Array<SubCategory>()
  };
}
