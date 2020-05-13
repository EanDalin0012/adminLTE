import { Header } from '../Class/class-header';
export class ProductRequest {
  public header = new Header();
  public body = {
    proId: 0,
    subCateId: 0,
    proName: '',
    resourceFileInfoId: '',
    description: '',
    createBy: 0,
    modifyBy: 0,
    createDate: '',
    modifyDate: '',
    status: '',
  };
}
