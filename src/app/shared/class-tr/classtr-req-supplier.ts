import { HeaderModel } from '../Class/class-req-header';
import { Supplier } from '../Class/class-suplier';

export class SupplierRequest extends HeaderModel {
  public body: Supplier;
}
