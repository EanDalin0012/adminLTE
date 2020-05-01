import { Header } from '../Class/class-header';
import { ReturnYN } from '../Class/class-return';

export class SupplierResponse {
  public header = new Header();
  public body: ReturnYN;
}
