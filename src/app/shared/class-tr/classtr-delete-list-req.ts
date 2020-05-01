import { HeaderModel } from '../Class/class-req-header';
import { IDDto } from '../Class/class-id';

export class DeleteList extends HeaderModel {
  public body = {
    list: Array<IDDto>()
  };
}
