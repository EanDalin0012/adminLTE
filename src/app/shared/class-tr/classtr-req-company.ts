import { Header } from '../Class/class-header';
import { Company } from '../Class/class-company';
export class CompanyRequest {
  public header = new Header();
  public body = {
    id: 0,
    name: '',
    contact: '',
    email: '',
    address: '',
    description: '',
    createBy: 0,
    modifyBy: 0,
    createDate: '',
    modifyDate: '',
    status: '',
  };
}
