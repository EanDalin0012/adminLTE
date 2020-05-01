import { HeaderModel } from '../Class/class-req-header';
import { Header } from '../Class/class-header';
import { ReturnYN } from '../Class/class-return';

export class RequestResult {
  header: Header;
  body: ReturnYN;
}
