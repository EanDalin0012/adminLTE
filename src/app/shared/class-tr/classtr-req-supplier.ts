import { HeaderModel } from '../Class/class-req-header';
import { Supplier } from '../Class/class-suplier';

export class SupplierRequest extends HeaderModel {
  public body = {
    id: 0,
    supName: '',
    supContact: '',
    supContactTwo: '',
    supEmail: '',
    description: '',
    createBy: 0,
    modifyBy: 0,
    createDate: '',
    modifyDate: '',
    status: ''
  };
}
