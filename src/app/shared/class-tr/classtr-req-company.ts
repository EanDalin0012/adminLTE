import { Header } from '../Class/class-header';
import { Company } from '../Class/class-company';
export class CompanyRequest {
  public header = new Header();
  public body: Company;
}
