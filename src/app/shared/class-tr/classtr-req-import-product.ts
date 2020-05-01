import { Header } from '../Class/class-header';
import { ImportPoduct } from '../Class/class-import-product';
export class ImportProductRequest {
  header = new Header();
  body   = { list: new Array<ImportPoduct>() };
}
