import { Header } from '../Class/class-header';
import { Product } from '../class/class-product';
export class ProductResponse {
  public header = new Header();
  public body: {
    list: Product [];
  };
}
