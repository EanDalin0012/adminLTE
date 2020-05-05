import { Header } from '../Class/class-header';
export class SubCategoryRequest {
  header = new Header();
  body = {
    id: 0,
    mainCategoryId: 0,
    subCategoryName: '',
    description: '',
    createBy: 0,
    modifyBy: 0,
    createDate: '',
    modifyDate: '',
    status: ''
  };
}
