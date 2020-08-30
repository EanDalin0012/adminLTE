import { Header } from '../Class/class-header';
import { MainCategory } from '../Class/class-main-category';
export class MainCategoryRequest {
  header =  new Header();
  body = {
    id: 0,
    name: '',
    description: '',
    createBy: 0,
    modifyBy: 0,
    createDate: '',
    modifyDate: '',
    status: ''
  }
}
