import { HeaderModel } from '../Class/class-req-header';
import { ImportPoduct } from '../Class/class-import-product';

export class ImportProductRequest extends HeaderModel {
  public body = {
    list: Array<ImportPoduct>()
  };
}
